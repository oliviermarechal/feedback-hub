import { SupportedLanguage } from "../../main";

export const translations: { [key in SupportedLanguage]: {[key: string]: string} } = {
    en: {
        "add_feedback": "Add feedback",
        "upvote": "Upvote",
        "type": "Type",
        "email": "Email",
        "enhance": "Enhance",
        "bug": "Bug",
        "content": "Content",
        "cancel": "Cancel",
        "send": "Send",
        "date": "Date",
        "vote": "Vote",
    },
    fr: {
        "add_feedback": "Ajouter un feedback",
        "upvote": "Upvote",
        "type": "Type",
        "email": "Email",
        "enhance": "Suggestion",
        "bug": "Erreur",
        "content": "Contenu",
        "cancel": "Annuler",
        "send": "Envoyer",
        "date": "Date",
        "vote": "Vote",
    },
};
