import React from 'react';
import s from "./Paginator.module.scss";

type PaginatorType = {
    currentPage: number,
    onClickHandler: (pageNumber: number) => void,
}

const Paginator: React.FC<PaginatorType> = ({onClickHandler, currentPage}) => {
    let pages = [];
    for (let i = 1; i < 10; i++) {
        pages.push(i);
    }

    return (
        <div className={s.selectPage}>
            {
                pages.map(page => <span
                    onClick={() => {
                        onClickHandler(page)
                    }}
                    className={currentPage === page ? `${s.selectPage_chosen}` : ``}
                    key={page}>{page}</span>)
            }
        </div>
    )
}

export default Paginator;