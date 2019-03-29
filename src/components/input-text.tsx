import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Spacer } from '@components/spacer'
import { Text } from '@components/text'
import { ThemeContext } from '@contexts/theme-context'

type Props = import('react-native').TextInputProps & {
  label: string
}

const InputText = React.forwardRef<TextInput, Props>((props, ref) => (
  <>
    <Spacer marginBottom={5}>
      <Text fontSize={18} color="primary025" fontWeight="bold">
        {props.label}
      </Text>
    </Spacer>
    <ThemeContext.Consumer>
      {({ theme }) => (
        <TextInput
          ref={ref}
          style={[
            styles.inputText,
            { color: theme.primary025, borderColor: theme.primary025 },
          ]}
          placeholderTextColor={theme.primary050}
          {...props}
        />
      )}
    </ThemeContext.Consumer>
  </>
))

type Style = {
  inputText: import('react-native').TextStyle
}

const styles = StyleSheet.create<Style>({
  inputText: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    fontSize: 22,
  },
})

export { InputText }
