type Theme = import('@contexts/theme-context').Theme
type NavigationStackScreenOptions = import('react-navigation').NavigationStackScreenOptions
type NavigationScreenConfigProps = import('react-navigation').NavigationScreenConfigProps

const defaultNavigationOptions = ({
  screenProps,
}: NavigationScreenConfigProps): NavigationStackScreenOptions => {
  const theme = screenProps.theme as Theme
  return {
    headerTintColor: theme.primary025,
    headerStyle: {
      backgroundColor: theme.primary100,
    },
    headerBackTitleStyle: {
      opacity: 0,
    },
  }
}

export { defaultNavigationOptions }
