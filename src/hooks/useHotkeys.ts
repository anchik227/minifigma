import { useEffect } from 'react';
import type { Tool } from '../types/shape';
import { TOOL_BY_KEY } from '../constants/tools';

export interface UseHotkeysArgs {
  /** Вызывается при нажатии клавиши инструмента (v / r / o). */
  onToolChange?: (tool: Tool) => void;
}

/** Теги, внутри которых клавиши принадлежат полю ввода, а не приложению. */
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * Клавиша относится к полю ввода, а не к холсту: там буква — это символ
 * (или, у number-input, и вовсе отбрасывается), и переключать по ней
 * инструмент нельзя.
 */
function isTypingContext(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || EDITABLE_TAGS.has(target.tagName);
}

/**
 * Горячие клавиши: клавиши инструментов (v / r / o) переключают активный
 * инструмент в App — тот же обработчик, что и клики на панели слева.
 * С модификаторами и внутри полей ввода клавиши игнорируются, чтобы
 * Ctrl+R оставался перезагрузкой страницы, а буквы в полях — вводом.
 */
export function useHotkeys({ onToolChange }: UseHotkeysArgs = {}): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingContext(e.target)) return;
      const tool = TOOL_BY_KEY[e.key.toLowerCase()];
      if (tool) onToolChange?.(tool);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onToolChange]);
}
