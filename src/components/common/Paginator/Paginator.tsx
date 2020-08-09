import React, {useState} from 'react';
import s from './Paginator.module.scss';

type PaginatorType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onClickHandler: (pageNumber: number) => void,
    portionSize?: number
}

const Paginator: React.FC<PaginatorType> = React.memo(({totalItemsCount, pageSize, onClickHandler, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={s.selectPage}>
            {portionNumber > 1 &&
            <button className={s.selectPage__btn} onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(page => <span
                        onClick={() => {
                            onClickHandler(page)
                        }}
                        className={currentPage === page ? `${s.selectPage_chosen}` : ``}
                        key={page}>{page}</span>)
            }
            {portionCount > portionNumber &&
            <button className={s.selectPage__btn} onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
        </div>
    )
})

export default Paginator;