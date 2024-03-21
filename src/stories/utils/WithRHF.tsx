import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react'
import { ReactElement, ReactNode, FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// https://gist.github.com/shumbo/3bbb8a2dea5ea0a90ecf0b7c103783e8 copied from here

const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action('[React Hooks Form] Submit'))}
      >
        {children}
      </form>
    </FormProvider>
  )
}

const WithRHF =
  (showSubmitButton: boolean) =>
  (Story: FC): ReturnType<StoryFn<ReactElement>> =>
    (
      <StorybookFormProvider>
        <Story />
        {showSubmitButton && <button type="submit">Submit</button>}
      </StorybookFormProvider>
    ) as ReturnType<StoryFn<ReactElement>>

export default WithRHF
