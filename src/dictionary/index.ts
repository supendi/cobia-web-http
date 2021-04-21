import { Dictionary, TextType, Locale, getTranslation } from '@cobia/lib'
import appSettings from "../../App.setting"

//Represents the global wording
const dictionaries: Dictionary[] = [
    {
        type: TextType.Message,
        code: "NetworkError",
        wordings: [
            {
                locale: Locale.Indonesia,
                text: "Sepertinya ada masalah jaringan. Mohon cek internet kamu dan coba lagi",
            },
            {
                locale: Locale.US,
                text: "We don't know if it's us or you who have the network problem",
            }
        ],
    },
]

const globalDictionary = {
    networkError: getTranslation("NetworkError", dictionaries, appSettings.currentLocale, TextType.Message),
}

export default globalDictionary