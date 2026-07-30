import { useLazyQuery } from '@apollo/client';
import {
  CandlestickData,
  CandlestickSeries,
  CrosshairMode,
  HistogramData,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  createChart,
} from 'lightweight-charts';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { listTradeCandlesQueryDef } from './ChartGql';

import { Trade, useTradesEvent } from '@hooks/useTradesEvent';
import { fromDateTimeScalar } from '@utils/scalars';

const PAGE_SIZE = 1000;

// Fetch an older page once the viewport comes within this many bars of the oldest one.
const HISTORY_TRIGGER_BARS = 10;

const UP_COLOR = '#22c55e';
const DOWN_COLOR = '#ef4444';
const AXIS_COLOR = 'rgba(148, 163, 184, 0.2)';
const GRID_COLOR = 'rgba(148, 163, 184, 0.1)';

export interface ChartResolution {
  label: string;
  value: string;
}

// Must stay in sync with what the API accepts — see TradeService.listTradeCandles
// in tokenzyme-core, which parses these as minutes ('1D' being the exception).
export const CHART_RESOLUTIONS: ChartResolution[] = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '6h', value: '360' },
  { label: '12h', value: '720' },
  { label: '1D', value: '1D' },
];

const DEFAULT_RESOLUTION = '5';

interface Candle {
  // Epoch milliseconds, as the API returns it. Lightweight Charts wants seconds,
  // so every conversion to series data divides by 1000.
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
}

interface UseDependenciesHook {
  chartContainerRef: RefObject<HTMLDivElement | null>;
  resolution: string;
  setResolution: (resolution: string) => void;
}

const resolutionToMs = (resolution: string): number =>
  (resolution === '1D' ? 1440 : parseInt(resolution, 10)) * 60 * 1000;

const toCandlestickData = (candle: Candle): CandlestickData<UTCTimestamp> => ({
  time: (candle.time / 1000) as UTCTimestamp,
  open: candle.open,
  high: candle.high,
  low: candle.low,
  close: candle.close,
});

const toVolumeData = (candle: Candle): HistogramData<UTCTimestamp> => ({
  time: (candle.time / 1000) as UTCTimestamp,
  value: candle.volume,
  color: candle.close >= candle.open ? `${UP_COLOR}66` : `${DOWN_COLOR}66`,
});

export const useDependencies = (token: Token): UseDependenciesHook => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const candlesRef = useRef<Candle[]>([]);
  const isLoadingHistoryRef = useRef(false);
  const hasMoreHistoryRef = useRef(true);
  // Lets the one-time timeScale subscription always call the current closure.
  const loadMoreHistoryRef = useRef<(() => void) | null>(null);

  const [resolution, setResolution] = useState<string>(DEFAULT_RESOLUTION);

  const [listTradeCandlesQuery] = useLazyQuery(listTradeCandlesQueryDef, { fetchPolicy: 'no-cache' });

  const fetchCandles = useCallback(
    async (lastCandleTimestamp?: number): Promise<Candle[]> => {
      const { data } = await listTradeCandlesQuery({
        variables: { tokenAddress: token.address, resolution, pageSize: PAGE_SIZE, lastCandleTimestamp },
      });
      return (data?.tradeCandles ?? []).map((candle) => ({
        time: candle.time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
      }));
    },
    [listTradeCandlesQuery, token.address, resolution],
  );

  const renderCandles = useCallback((): void => {
    candleSeriesRef.current?.setData(candlesRef.current.map(toCandlestickData));
    volumeSeriesRef.current?.setData(candlesRef.current.map(toVolumeData));
  }, []);

  const loadMoreHistory = useCallback((): void => {
    if (isLoadingHistoryRef.current || !hasMoreHistoryRef.current) {
      return;
    }
    const oldestCandle = candlesRef.current[0];
    if (!oldestCandle) {
      return;
    }

    isLoadingHistoryRef.current = true;
    // lastCandleTimestamp is in seconds and inclusive, so step back one second.
    fetchCandles(Math.floor(oldestCandle.time / 1000) - 1)
      .then((olderCandles): void => {
        if (olderCandles.length) {
          candlesRef.current = [...olderCandles, ...candlesRef.current];
          renderCandles();
        }
        hasMoreHistoryRef.current = olderCandles.length === PAGE_SIZE;
      })
      .catch((): void => {
        // Leave hasMoreHistory alone so a later scroll can retry.
      })
      .finally((): void => {
        isLoadingHistoryRef.current = false;
      });
  }, [fetchCandles, renderCandles]);

  useEffect((): void => {
    loadMoreHistoryRef.current = loadMoreHistory;
  }, [loadMoreHistory]);

  // Create the chart once. Series data is loaded by the effect below.
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) {
      return undefined;
    }

    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { color: 'transparent' },
        textColor: '#9ca3af',
        // attributionLogo is left at its default (true). Lightweight Charts is
        // Apache-2.0, but TradingView asks for attribution — do not disable this
        // without providing credit somewhere else in the UI.
      },
      grid: {
        vertLines: { color: GRID_COLOR },
        horzLines: { color: GRID_COLOR },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: AXIS_COLOR },
      timeScale: { borderColor: AXIS_COLOR, timeVisible: true, secondsVisible: false },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: UP_COLOR,
      downColor: DOWN_COLOR,
      borderUpColor: UP_COLOR,
      borderDownColor: DOWN_COLOR,
      wickUpColor: UP_COLOR,
      wickDownColor: DOWN_COLOR,
      // Token prices are tiny — match the 8 decimals the old chart used.
      priceFormat: { type: 'price', precision: 8, minMove: 0.00000001 },
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });

    chart.timeScale().subscribeVisibleLogicalRangeChange((range): void => {
      if (range && range.from <= HISTORY_TRIGGER_BARS) {
        loadMoreHistoryRef.current?.();
      }
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return (): void => {
      // Disposes the series and every subscription along with the chart.
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, []);

  // Reload from scratch whenever the token or the resolution changes.
  useEffect(() => {
    let isCancelled = false;

    candlesRef.current = [];
    hasMoreHistoryRef.current = true;
    isLoadingHistoryRef.current = false;
    renderCandles();

    fetchCandles()
      .then((candles): void => {
        if (isCancelled) {
          return;
        }
        candlesRef.current = candles;
        hasMoreHistoryRef.current = candles.length === PAGE_SIZE;
        renderCandles();
        chartRef.current?.timeScale().fitContent();
      })
      .catch((): void => {
        // Nothing to render; the chart stays empty.
      });

    return (): void => {
      isCancelled = true;
    };
  }, [fetchCandles, renderCandles]);

  const handleTrade = useCallback(
    (trade: Trade): void => {
      const candleSeries = candleSeriesRef.current;
      const volumeSeries = volumeSeriesRef.current;
      if (!candleSeries || !volumeSeries) {
        return;
      }

      const intervalMs = resolutionToMs(resolution);
      const time = Math.floor(fromDateTimeScalar(trade.createdAt).getTime() / intervalMs) * intervalMs;
      const candles = candlesRef.current;
      const lastCandle = candles[candles.length - 1];

      let candle: Candle;
      if (!lastCandle || time > lastCandle.time) {
        candle = {
          time,
          open: trade.avgPrice,
          high: trade.avgPrice,
          low: trade.avgPrice,
          close: trade.avgPrice,
          volume: trade.tokenAmount,
        };
        candlesRef.current = [...candles, candle];
      } else {
        candle = {
          ...lastCandle,
          high: Math.max(lastCandle.high, trade.avgPrice),
          low: Math.min(lastCandle.low, trade.avgPrice),
          close: trade.avgPrice,
          volume: lastCandle.volume + trade.tokenAmount,
        };
        candlesRef.current = [...candles.slice(0, -1), candle];
      }

      candleSeries.update(toCandlestickData(candle));
      volumeSeries.update(toVolumeData(candle));
    },
    [resolution],
  );

  useTradesEvent(token.address, handleTrade);

  return { chartContainerRef, resolution, setResolution };
};
