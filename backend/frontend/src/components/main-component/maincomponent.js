import React, { Component } from 'react';
import SearchBox from '../search-component/search';
import Bookslist from '../book-list/booklist';
import './maincomponent.css';

class Main extends Component {
    constructor(verified) {
        super();
        this.state = {
            books: [],
            searchfield: '',
            x: 0,
            loading: true,
            logged: false,
            verify:verified,
            current: [],
            page_no: 1,
            total_page: 0,
        }
    };
    componentDidMount() {
            if(!this.state.logged){
    var requestOptions = {
            method: 'GET',
        };
    
        fetch("http://127.0.0.1:8000/api/check/", requestOptions)
            .then(response => response.json())
            .then(result => {
                     if(result.logged && localStorage.getItem('data')){
    this.setState({logged:true})
    }
            })
            .catch(error => console.log('error', error));}
        this.setState({ loading: true })
        fetch('http://127.0.0.1:8000/api/booklist/').then(data => data.json()).then(data => this.setState({ books: data, loading: false, current: data.slice(0, 20) }))
    }
    render() {
        const filter_c = () => {
            if (this.state.logged) {
                return (
                    <>
                        <p><b>Filter</b></p>
                        <button class="btn btn-light" onClick={() => getbookbycollege('BTI')}>From Same College/school</button><br></br>
                        <button class="btn btn-light" onClick={() => getbookbycity('Bangalore')}>From Same city</button><br></br>
                    </>
                )
            }
            else {
                return (<button class="btn btn-light" onClick={() => window.location.href = '/login'}>Login</button>)
            }
        }
        const getbookbycity = (city) => {
            this.setState({ loading: true })
            fetch('http://127.0.0.1:8000/api/city/' + city + '/booklist/').then(data => data.json()).then(data => this.setState({ books: data, loading: false, current: data.slice(0, 20) }))
        }
        const getbookbycollege = (college) => {
            this.setState({ loading: true })
            fetch('http://127.0.0.1:8000/api/college/' + college + '/booklist/').then(data => data.json()).then(data => this.setState({ books: data, loading: false, current: data.slice(0, 20) }))
        }

        const { books, searchfield } = this.state;
        const FilterBooks = books.filter(book => { return book.book_name.toLowerCase().includes(searchfield.toLowerCase()); })
        const current = (baselimit) => {
            this.setState({ current: FilterBooks.slice(baselimit * 20, baselimit * 20 + 21), page_no: baselimit + 1 })
            var i = 0
            while (i < document.getElementsByClassName('num').length) { document.getElementsByClassName('num')[i].classList.remove("active"); i++ }
            document.getElementsByClassName('num')[baselimit].classList.add('active')
        }

        const page_nav = () => {
            var no = FilterBooks.length / 20;
            no = FilterBooks % 20 == 0 ? no : no + 1;
            return (
                <>
                    {[...Array(parseInt(no)).keys()].map((key) => (
                        <li className="page-item num" key={key} onClick={() => current(key)}>
                            <a className="page-link">{key + 1}</a>
                        </li>
                    ))}
                </>)
        }
        const next = () => {
            var no = FilterBooks.length / 20;
            no = FilterBooks % 20 == 0 ? no : no + 1;
            no = parseInt(no)
            current(this.state.page_no % no)
        }
        const bookl = () => {
            if (FilterBooks.length == 0) {
                return (<p> No Books Found</p>
                )
            } else if (FilterBooks.length < 20) {
                return (<div id="root"><Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                />
                <Bookslist
                    filterbooks={this.state.current}
                    logged={this.state.logged}
                    verified = {this.state.verify}
                /></div>)
            }
            else {
                return (
                    <div id='bookdisplay'>
                        <div id="root"><Bookslist
                            filterbooks={this.state.current}
                            logged={this.state.logged}
                            verified = {this.state.verify}
                        /></div><center>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {
                                        page_nav()
                                    }
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next" onClick={() => next()}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav></center>

                    </div>)
            }
        }

        if (this.state.loading) {
            return (
                <><center>
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div></center>
                </>
            )
        } else {
            return (
                <React.Fragment>
                    <div id='main-body'>
                        <div id='f_content'>
                            <div id='filter_com'>
                                <div id='search'>
                                    <SearchBox
                                        HandleClick={x => { this.setState({ searchfield: document.getElementById('search_box').value }) }}
                                    />
                                </div>
                                <div id="filter">
                                    {filter_c()}
                                </div>
                            </div>

                            {
                                bookl()
                            }

                        </div></div>
                </React.Fragment>

            )
        }
    }
}

export default Main;