import React from "react";

const CardsFilter: React.FC<{selected: string, onChangeFilter: any}> = (props) => {
    const changeHandler = (event: any) => {
        props.onChangeFilter(event.target.value);
    };

    return (
        <div className="cards-filter">
            <label>Filter by Mana Cost</label>
            <select value={props.selected} onChange={changeHandler}>
                <option value="none">none</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}

export default CardsFilter;