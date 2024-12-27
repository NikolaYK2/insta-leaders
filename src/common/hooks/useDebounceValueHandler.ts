import { useCallback, useRef, useState } from "react";

// Определяем тип возвращаемого значения хука, который включает
// локальное значение состояния и функцию для обработки изменений значения
type UseDebounceValueHandlerResult<T> = {
  valueDebounce: T;
  handleSelect: (value: T) => void;
};
// Определяем тип параметров, которые принимает хук
type UseDebounceValueHandlerParams<T> = {
  initialValue: T;
  onChange: (value: T) => void;
  delay: number;
};
// Кастомный хук, который предоставляет дебаунс для обработки обновления значения
export const useDebounceValueHandler = <T>({
  initialValue, // Начальное значение для локального состояния
  onChange, // Колбэк-функция, выполняемая после задержки дебаунса
  delay, // Задержка дебаунса в миллисекундах
}: UseDebounceValueHandlerParams<T>): UseDebounceValueHandlerResult<T> => {
  // Состояние для отслеживания текущего значения
  const [valueDebounce, setValueDebounce] = useState<T>(initialValue);
  // useRef для хранения таймера дебаунса, чтобы можно было его очистить при необходимости
  const debounceTimer = useRef<number | null>(null);

  // useCallback для мемоизации функции handleSelect, чтобы избежать ненужных пересозданий
  const handleSelect = useCallback(
    (value: T) => {
      // Обновляем локальное состояние немедленно
      setValueDebounce(value);

      // Если таймер уже существует, очищаем его, чтобы избежать выполнения предыдущей отложенной функции
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Устанавливаем новый таймер дебаунса для вызова функции onChange после указанной задержки
      debounceTimer.current = window.setTimeout(() => {
        onChange(value);
      }, delay);
    },
    [onChange, delay], // Зависимости для useCallback, чтобы функция обновлялась при их изменении
  );

  // Возвращаем текущее значение и функцию handleSelect
  return { valueDebounce, handleSelect };
};
