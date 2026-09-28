/**
 * Цвета приложения в одном месте.
 *
 * Раньше они были разбросаны литералами по компонентам: дефолтная заливка
 * дублировалась в useShapes дважды, цвет рамки выделения жил внутри Shape.
 * Теперь менять палитру нужно только здесь.
 */

/** Акцент интерфейса — тот же синий, что у рамки выделения на холсте. */
export const ACCENT = '#0d99ff';

/** Цвет рамки выделения и маркеров на холсте. */
export const SELECT_COLOR = ACCENT;

/** Заливка новой фигуры по умолчанию. */
export const DEFAULT_FILL = '#9747ff';

/** Цвет обводки новой фигуры по умолчанию. */
export const DEFAULT_STROKE = '#000000';

/**
 * Классы подсветки активного состояния.
 * Toolbar и LayersPanel используют одну и ту же строку — раньше там были
 * разные оттенки текста (violet-300 против violet-200) для одного состояния.
 */
export const ACTIVE_ITEM_CLASS =
  'bg-violet-500/20 text-violet-300';
export const INACTIVE_ITEM_CLASS = 'text-slate-400 hover:bg-slate-800 hover:text-slate-200';
