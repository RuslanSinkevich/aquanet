import { useDispatch, useSelector } from "react-redux"; // Импорт хуков из React Redux
import type { TypedUseSelectorHook } from "react-redux"; // Импорт TypedUseSelectorHook из React Redux
import { AppDispatch, RootState } from "store/store";

// В этом коде мы создаем два кастомных хука, которые используются вместо стандартных useDispatch и useSelector.

// Хук useAppDispatch, который возвращает AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Хук useAppSelector, который принимает тип RootState и возвращает функцию TypedUseSelectorHook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
