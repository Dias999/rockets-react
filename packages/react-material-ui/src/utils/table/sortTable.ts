import {
  RowsProps,
  CustomTableCell,
  Order,
} from '../../Components/Table/Table';

const descendingComparator = (a: string | number, b: string | number) => {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
};

const getSortableValue = (item: CustomTableCell | string | number) => {
  if (typeof item === 'number' || typeof item === 'string') {
    return item;
  }

  if ('sortableValue' in item && item.sortableValue) {
    return item.sortableValue;
  }

  return 0;
};

const getComparator = (
  a: RowsProps,
  b: RowsProps,
  order: Order,
  orderBy: string,
) => {
  const aVal = getSortableValue(a[orderBy]);
  const bVal = getSortableValue(b[orderBy]);

  return order === 'desc'
    ? descendingComparator(aVal, bVal)
    : -descendingComparator(aVal, bVal);
};

export default getComparator;
