import {IndexValue} from '../../../types/IndexValue';
import {SortSetup} from '../../../types/SortSetup';

export enum RowsPerPage {
	few = 1,
	some = 5,
	several = 10,
	many = 20
}

export type TableState = {
	years: number[]
	selectedYear: number
	indexValues: IndexValue[]
	currentPage: number
	rowsPerPage: RowsPerPage
	sortSetup: SortSetup<IndexValue>
}