import { isStringEmpty } from '@utils/is-string-empty'
import { firestore } from 'react-native-firebase'
import { DICTIONARIES } from '@constants/database'
import { getErrorMessageFromFirestoreError } from '@utils/get-error-message-from-firestore-error'

type Dictionary = import('@models/dictionary').Dictionary

export const updateDictionary = async (dictionary: Dictionary) => {
  try {
    const { name } = dictionary
    if (isStringEmpty(name)) {
      throw new Error('A name is required.')
    }

    const dictionaries = firestore().collection(DICTIONARIES)
    await dictionaries.doc(dictionary.id).update({
      name,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })
  } catch (error) {
    throw new Error(getErrorMessageFromFirestoreError(error))
  }
}
