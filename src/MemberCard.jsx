import { Component } from "react";

class MemberCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            errors: ""
        }
    }

    pay = () => {
        const { member } = this.props;
        fetch(`http://127.0.0.1:8000/api/members/${member.id}/pay`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    success: true,
                    errors: ""
                });
                this.listMembers();
            } else {
                const data = await response.json();
                this.setState({
                    succes: false,
                    errors: data.message
                });
            }
        });
    }

    render() {
        const { member } = this.props;
        const { success, errors } = this.state;
        const alertError = <div className="alert alert-danger">{errors}</div>
        const alertSuccess = <div className="alert alert-success">Sikeres Befizetés</div>
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 card">
                <div className="card-body">
                    <h2>{member.name}</h2>
                    <p>Született: {member.birth_date}</p>
                    <p>Csatlakozott: {member.created_at}</p>
                    <img src={`kepek/${member.gender === 'M' ? 'male.png' : member.gender === 'F' ? 'female.png' : 'other.png'}`}
                        alt={member.gender === 'M' ? 'male' : member.gender === 'F' ? 'female' : 'other'} className="img-fluid" />
                    <button className="btn btn-primary mb-3" onClick={this.pay}>Tagdíj befizetés</button>
                    {success ? alertSuccess : errors !== "" ? alertError : ""}
                </div>
            </div>
        )
    }
}

export default MemberCard