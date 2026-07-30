import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { JSX } from 'react';
import { FormProvider } from 'react-hook-form';

import { useDependencies } from './LaunchTokenHooks';
import { LogoFileField } from './components/LogoFileField';

import { ConnectWalletButton } from '@components/ConnectWalletButton';
import { TokenCard } from '@components/TokenCard';
import { NumberField } from '@design/form/NumberField';
import { TextAreaField } from '@design/form/TextAreaField';
import { TextField } from '@design/form/TextField';
import { formatNumber } from '@utils/numbers';

export function LaunchToken(): JSX.Element {
  const {
    stepperRef,
    form,
    account,
    symbol,
    ethBalance,
    amountOut,
    warningMessage,
    getFormValuesAsToken,
    handlers: { handleBackClick, handleContinueClick, handleSubmit },
  } = useDependencies();

  return (
    <FormProvider {...form}>
      <form className="flex justify-center" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4 w-full md:w-4/5 lg:w-1/2">
          <h1 className="text-center">Launch a token</h1>
          <Stepper ref={stepperRef} linear>
            <StepperPanel header="Token Info">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <LogoFileField />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <TextField name="name" label="Name *" />
                    <TextField name="symbol" label="Symbol *" keyfilter="alphanum" />
                    <TextAreaField name="description" label="Description *" rows={4} containerClassName="col-span-2" />
                    <TextField
                      name="websiteUrl"
                      label="Website URL"
                      placeholder="https://..."
                      showErrorMessage={false}
                      containerClassName="col-span-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    label="Continue"
                    disabled={!form.formState.isValid}
                    onClick={handleContinueClick}
                  />
                </div>
              </div>
            </StepperPanel>
            <StepperPanel header="Social Media">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <TextField name="xUrl" label="X URL" placeholder="https://x.com/..." showErrorMessage={false} />
                  <TextField
                    name="telegramUrl"
                    label="Telegram URL"
                    placeholder="https://t.me/..."
                    showErrorMessage={false}
                  />
                  <TextField
                    name="discordUrl"
                    label="Discord URL"
                    placeholder="https://discord.gg/..."
                    showErrorMessage={false}
                  />
                  <TextField
                    name="redditUrl"
                    label="Reddit URL"
                    placeholder="https://reddit.com/r/..."
                    showErrorMessage={false}
                  />
                  <TextField
                    name="facebookUrl"
                    label="Facebook URL"
                    placeholder="https://facebook.com/..."
                    showErrorMessage={false}
                  />
                  <TextField
                    name="instagramUrl"
                    label="Instagram URL"
                    placeholder="https://instagram.com/..."
                    showErrorMessage={false}
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    label="Back"
                    outlined
                    disabled={!form.formState.isValid}
                    onClick={handleBackClick}
                  />
                  <Button
                    type="button"
                    label="Continue"
                    disabled={!form.formState.isValid}
                    onClick={handleContinueClick}
                  />
                </div>
              </div>
            </StepperPanel>
            <StepperPanel header="Confirmation">
              <div className="flex flex-col gap-3">
                <div className="text-xl">This is how your token will look like:</div>
                <TokenCard token={getFormValuesAsToken()} />
                {account && (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="font-bold">Secure your spot and buy the first tokens</span>
                      <span>S balance: {formatNumber(ethBalance)}</span>
                    </div>
                    <NumberField
                      name="buyAmount"
                      placeholder="Enter amount"
                      inputMode="decimal"
                      min={0}
                      maxFractionDigits={4}
                    />
                    <div className="text-sm">
                      {`You receive: ${amountOut ? formatNumber(amountOut) : 0} ${symbol.toUpperCase()}`}
                    </div>
                  </div>
                )}
                {warningMessage && <Message text={warningMessage} severity="warn" />}
                <Message text="Token data cannot be modified after launch." severity="info" />
                <div className="flex justify-between">
                  <Button
                    type="button"
                    label="Back"
                    outlined
                    disabled={!form.formState.isValid}
                    onClick={handleBackClick}
                  />
                  {account ? (
                    <Button
                      label="Launch Token"
                      loading={form.formState.isSubmitting}
                      disabled={!form.formState.isValid}
                    />
                  ) : (
                    <ConnectWalletButton />
                  )}
                </div>
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </form>
    </FormProvider>
  );
}
