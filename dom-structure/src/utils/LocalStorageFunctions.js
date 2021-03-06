import {incrementVersionStorage} from "../actions/index";
import {notifierError, notifierSuccess, ALERT} from "./Notifier";


export const copyComponentsToLocalStorage = (extensionInfo, section, dispatch) => {
    localStorage.setItem("copiedComponents", JSON.stringify(section.components));
    if (localStorage.getItem('copiedComponents') && localStorage.getItem('copiedComponents') === JSON.stringify(section.components)) {
        dispatch(incrementVersionStorage());
        notifierSuccess(extensionInfo.extension, ALERT.SUCCESS_COPY_COMPONENTS);
    } else {
        notifierError(extensionInfo.extension, ALERT.ERROR_COPY_COMPONENTS)
    }
}

export const copySectionToLocalStorage = (extensionInfo, section, dispatch) => {
    localStorage.setItem("copiedSection", JSON.stringify(section));
    if (localStorage.getItem('copiedSection') && localStorage.getItem('copiedSection') === JSON.stringify(section)) {
        dispatch(incrementVersionStorage());
        notifierSuccess(extensionInfo.extension, ALERT.SUCCESS_COPY_SECTION);
    } else {
        notifierError(extensionInfo.extension, ALERT.ERROR_COPY_SECTION);
    }
}

export const copyComponentToLocalStorage = (extensionInfo, component, dispatch) => {
    localStorage.setItem("copiedComponents", JSON.stringify([component]));
    if (localStorage.getItem('copiedComponents') && localStorage.getItem('copiedComponents') === JSON.stringify([component])) {
        dispatch(incrementVersionStorage());
        notifierSuccess(extensionInfo.extension, ALERT.SUCCESS_COPY_COMPONENT);
    } else {
        notifierError(extensionInfo.extension, ALERT.ERROR_COPY_COMPONENT);
    }
}
