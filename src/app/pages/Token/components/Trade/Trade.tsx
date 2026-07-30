import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Card } from 'primereact/card';
import { JSX } from 'react';
import { FormProvider } from 'react-hook-form';

import { TokenGql } from '../../TokenGql';

import { useDependencies } from './TradeHooks';
import { SlippageDialog } from './components/SlippageDialog';

import ethLogo from '@assets/sonic-logo.png';
import { ConnectWalletButton } from '@components/ConnectWalletButton';
import { NumberField } from '@design/form/NumberField';
import { formatNumber } from '@utils/numbers';

interface TradeProps {
  token: TokenGql;
}

export function Trade({ token }: TradeProps): JSX.Element | null {
  const {
    form,
    account,
    isPromoted,
    ethBalance,
    tokenBalance,
    isBuy,
    isSwitched,
    amountIn,
    amountOut,
    warningMessage,
    handlers: { handleTradeTypeClick, handleSetSlippage, handleSlipppageChanged, handleSwitchBuyClick, handleSubmit },
  } = useDependencies(token);

  if (isPromoted) {
    return null;
  }

  return (
    <section>
      <SlippageDialog onSlippageChanged={handleSlipppageChanged} />
      <Card>
        <FormProvider {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-2">
              <ButtonGroup pt={{ root: { className: 'grow' } }}>
                <Button
                  type="button"
                  label="Buy"
                  severity={isBuy ? 'success' : 'secondary'}
                  size="small"
                  className="w-1/2"
                  outlined={!isBuy}
                  onClick={() => {
                    handleTradeTypeClick(true);
                  }}
                />
                <Button
                  type="button"
                  label="Sell"
                  severity={!isBuy ? 'danger' : 'secondary'}
                  size="small"
                  className="w-1/2"
                  outlined={isBuy}
                  onClick={() => {
                    handleTradeTypeClick(false);
                  }}
                />
              </ButtonGroup>
              <Button type="button" icon={<IconAdjustmentsHorizontal />} size="small" onClick={handleSetSlippage} />
            </div>
            {account && (
              <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-2 text-sm">
                  <span>{isBuy ? 'S' : token.symbol} balance:</span>
                  <span>{isBuy ? formatNumber(ethBalance) : formatNumber(tokenBalance)}</span>
                </div>
                {!isSwitched && (
                  <NumberField
                    name="amountIn"
                    placeholder={`Enter ${isBuy ? 'S' : token.symbol} amount`}
                    inputMode="decimal"
                    min={0}
                    maxFractionDigits={4}
                    rightAddOn={<Avatar image={isBuy ? ethLogo : token.logoUrl} shape="circle" />}
                    containerClassName="grow"
                  />
                )}
                {isBuy && isSwitched && (
                  <NumberField
                    name="amountOut"
                    placeholder={`Enter ${token.symbol} amount`}
                    inputMode="decimal"
                    min={0}
                    maxFractionDigits={4}
                    rightAddOn={<Avatar image={token.logoUrl} shape="circle" />}
                    containerClassName="grow"
                  />
                )}
                {!isSwitched ? (
                  <div className="text-sm">
                    {`You receive: ${amountOut ? formatNumber(amountOut) : 0} ${isBuy ? token.symbol : 'S'}`}
                  </div>
                ) : (
                  <div className="text-sm">{`You pay: ${amountIn ? formatNumber(amountIn) : 0} S`}</div>
                )}
                {warningMessage && <small className="text-yellow-300">{warningMessage}</small>}
                {isBuy && (
                  <div className="mt-1">
                    <Button
                      type="button"
                      label={`Switch to ${!isSwitched ? token.symbol : 'S'}`}
                      severity="secondary"
                      size="small"
                      outlined
                      pt={{ root: { className: 'text-xs p-2' } }}
                      onClick={handleSwitchBuyClick}
                    />
                  </div>
                )}
              </div>
            )}
            {account && (
              <Button
                label={`${isBuy ? 'Buy' : 'Sell'} ${token.symbol}`}
                severity={isBuy ? 'success' : 'danger'}
                loading={form.formState.isSubmitting}
                disabled={!form.formState.isValid}
              />
            )}
            {!account && <ConnectWalletButton />}
          </form>
        </FormProvider>
      </Card>
    </section>
  );
}
