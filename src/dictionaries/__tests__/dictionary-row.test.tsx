import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import { TouchableHighlight } from 'react-native'
import { WORDS_SCREEN } from '@constants/screens'
import { ClockIcon } from '@components/svg/clock-icon'
import {
  DICTIONARIES_ROW,
  DICTIONARIES_ROW_WORDS_COUNT,
  DICTIONARIES_ROW_UPDATED_AT,
} from '@e2e/ids'
import { DictionaryRow } from '../dictionary-row'

type NavigationParams = import('react-navigation').NavigationParams
type Dictionary = import('@models/dictionary').Dictionary

const push = jest.fn((path: string, params: NavigationParams) => path + params)
const navigation: any = { push }

jest.mock('react-native-firebase', () => undefined)

describe('DictionaryRow', () => {
  const dictionaryMock: Dictionary = {
    id: 'id',
    name: 'a name',
    words: [],
    createdAt: null,
    updatedAt: null,
  }

  const renderComponent = (
    dictionary: Partial<Dictionary> | undefined = undefined
  ) => {
    return render(
      <DictionaryRow
        navigation={navigation}
        testID={DICTIONARIES_ROW('id')}
        dictionary={{
          ...dictionaryMock,
          ...dictionary,
        }}
      />
    )
  }

  describe('interactions', () => {
    it('should navigate to the words screen on press', () => {
      const { getByType } = renderComponent()

      fireEvent.press(getByType(TouchableHighlight))

      expect(push).toHaveBeenCalledWith(WORDS_SCREEN, {
        dictionary: dictionaryMock,
        title: dictionaryMock.name,
      })
    })
  })

  describe('render', () => {
    it('should render the dictionary name', () => {
      const { getByText } = renderComponent()
      getByText('a name')
    })

    it('should render the number of words in the dictionary', () => {
      const { getByTestId, getByText } = renderComponent({
        words: ['a word', 'two word'],
      })
      getByTestId(DICTIONARIES_ROW_WORDS_COUNT)
      getByText(/2 word\(s\)/i)
    })

    describe('without updated date', () => {
      it('should not render the update date', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId(DICTIONARIES_ROW_UPDATED_AT)).toBeNull()
      })
    })

    describe('with updated date', () => {
      it('should render the update date', () => {
        const date = new Date()
        const { getByTestId, queryByText, getByType } = renderComponent({
          updatedAt: date,
        })
        expect(getByTestId(DICTIONARIES_ROW_UPDATED_AT)).not.toBeNull()
        expect(getByType(ClockIcon)).not.toBeNull()
        expect(queryByText(date.toLocaleDateString())).not.toBeNull()
      })
    })
  })
})
