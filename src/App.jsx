import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberCard from "./MemberCard";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            newMember: {
                name: "",
                gender: "",
                birth_date: ""
            },
            errors: ""
        }
    }

    componentDidMount() {
        this.listMembers();
    }

    listMembers = () => {
        fetch("http://127.0.0.1:8000/api/members").then(async response => {
            if (response.status === 200) {
                const data = await response.json();
                this.setState({
                    members: data.data
                });
            }
        });
    }

    createMember = () => {
        const { newMember } = this.state;
        fetch("http://127.0.0.1:8000/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newMember)
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    newMember: {
                        name: "",
                        gender: "",
                        birth_date: ""
                    },
                    errors: ""
                });
                this.listMembers();
            } else {
                const data = await response.json();
                this.setState({
                    errors: data.message
                });
            }
        });
    }

    nameInput = (event) => {
        const newValue = event.target.value;
        const { newMember } = this.state;
        this.setState({
            newMember: {
                name: newValue,
                gender: newMember.gender,
                birth_date: newMember.birth_date
            }
        });
    }

    genderInput = (event) => {
        const newValue = event.target.value;
        const { newMember } = this.state;
        this.setState({
            newMember: {
                name: newMember.name,
                gender: newValue,
                birth_date: newMember.birth_date
            }
        });
    }

    birth_dateInput = (event) => {
        const newValue = event.target.value;
        const { newMember } = this.state;
        this.setState({
            newMember: {
                name: newMember.name,
                gender: newMember.gender,
                birth_date: newValue
            }
        });
    }

    render() {
        const { members, newMember, errors } = this.state;
        const cardList = [];
        members.forEach(member => {
            cardList.push(<MemberCard member={member} />)
        });
        const alertError = <div className="alert alert-danger">{errors}</div>
        return (
            <div className="container">
                <header>
                    <nav className="navbar navbar-expand">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#member_form" className="nav-link">Új tag felvétele</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://petrik.hu" className="nav-link">Petrik honlap</a>
                            </li>
                        </ul>
                    </nav>
                    <h1 className="mb-5">Petrik Könyvklub</h1>
                </header>
                <main>
                    <section className="row">
                        {cardList}
                    </section>
                    <section id="member_form">
                        <h2 className="mt-5">Új tag felvétele</h2>
                        {errors !== "" ? alertError : ""}
                        <div>
                            <label htmlFor="name">Név</label>
                            <input type="text" className="form-control" placeholder="Név" id="name" name="name" value={newMember.name} onInput={this.nameInput} />
                        </div>
                        <div>
                            <label htmlFor="gender">Nem</label>
                            <input type="text" className="form-control" placeholder="Nem" id="gender" name="gender" value={newMember.gender} onInput={this.genderInput} />
                        </div>
                        <div>
                            <label htmlFor="birth_date">Születési dátum</label>
                            <input type="date" className="form-control" id="birth_date" name="birth_date" value={newMember.birth_date} onInput={this.birth_dateInput} />
                        </div>
                        <button className="btn btn-primary mt-3 mb-5" onClick={this.createMember}>Tagfelvétel</button>
                    </section>
                </main>
                <footer>
                    Készítette: Takács Balázs Levente
                </footer>
            </div>
        )
    }
}

export default App