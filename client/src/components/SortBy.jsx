<div className={style.sort}>
                        <p>Sort By:</p>
                            <div>
                            <select onChange={e => handleSortName(e)} >
                                <option value='asc'>A - Z</option>
                                <option value='desc'>Z - A</option>
                            </select>
                            <select onChange={e => handleSortAttack(e)}>
                                <option value='none'>Attack</option>
                                <option value='max'>Max</option>
                                <option value='min'>Min</option>
                            </select>
                            </div>
                        </div>