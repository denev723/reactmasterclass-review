import { atom } from "recoil";

export const isActiveAtom = atom({
    key: "isActive",
    default: false
});

export const themeAtom = atom({
    key: "isLight",
    default: true
});

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
});
