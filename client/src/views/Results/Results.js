import React, { Fragment } from "react";

import Header from "../../components/Header/Header";

import IconCross from "./icons/Cross2.png";
import IconCheck from "./icons/check2.png";

import "./Results.css";

class Results extends React.Component {
  state = {
    response: [],
    id_ft: this.props.match.params.id,
    currentCampaignId: this.props.match.params.id_camp
  };

  componentDidMount() {
    console.log(this.state.id_ft, this.state.currentCampaignId);

    this.callApi()
      .then(response => {
        console.log(response);
        this.setState({ response });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/results/process/${this.state.currentCampaignId}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    if (!this.state.response || this.state.response.length == []) return null;
    const chapterWithQuestions = {};
    this.state.response.forEach(function(e) {
      if (!chapterWithQuestions[e.chapitre_q]) {
        chapterWithQuestions[e.chapitre_q] = [e];
      } else {
        chapterWithQuestions[e.chapitre_q].push(e);
      }
    });
    console.log(chapterWithQuestions);
    return (
      <Fragment>
        <Header className="buttonreturn" />
        <table>
          <thead>
            <tr>
              <th />
              <th>campagne n-2</th>
              <th>campagne n-1</th>
              <th>campagne n</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>The table body</td>
              <td>with two columns</td>
            </tr> */}
            {chapterWithQuestions.Process_bases.map(e => (
              <tr>
                <td>
                  {e.id_q} - {e.intitule_q}
                </td>
                <td />
                <td />

                {e.reponse_r === 0 ? (
                  <td>
                    <img src={IconCross} />
                  </td>
                ) : (
                  <td>
                    <img src={IconCheck} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Results;
