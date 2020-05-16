import React, { Component } from "react";
import produce from "immer";
import "./TransactionHistory.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Cookies from "universal-cookie";

/**
 * Merupakan laman history transaksi
 */
class TransactionHistory extends Component{
  constructor() {
    super();
    const cookie = new Cookies();
    if (cookie.get("login") != undefined) {
      this.state.account = cookie.get("login").split(";")[0];
    } else {
      this.state.account = undefined;
    }
  }
  state = {
    data : [],
    balance : [],
    virtual : [],
    transaksi : []
  }

  componentDidMount() {
    const account = this.state.account;
    // Sending request using SOAP to ws-bank
    const request = require("request");
    let xml = 
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">
        <soapenv:Header/>
        <soapenv:Body>
            <ser:GetVirtualAccount/>
        </soapenv:Body>
    </soapenv:Envelope>`;
    let xml2 = 
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:AccountHistory>
              <arg0>` + account + `</arg0>
          </ser:AccountHistory>
        </soapenv:Body>
    </soapenv:Envelope>>`;
    let xml3 = 
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:AccountLogin>
              <arg0>` + account + `</arg0>
          </ser:AccountLogin>
        </soapenv:Body>
    </soapenv:Envelope>>`;

    // Target wsdl
    var options = {
      url: 'http://localhost:8080/ws-bank/service/TransactionHistory?wsdl',
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type':'text/xml;charset=utf-8',
      }
    };

    var options2 = {
      url: 'http://localhost:8080/ws-bank/service/TransactionHistory?wsdl',
      method: 'POST',
      body: xml2,
      headers: {
        'Content-Type':'text/xml;charset=utf-8',
      }
    };

    var options3 = {
      url: 'http://localhost:8080/ws-bank/service/Login?wsdl',
      method: 'POST',
      body: xml3,
      headers: {
        'Content-Type':'text/xml;charset=utf-8',
      }
    };

    //Method melakukan perbandingan nilai
    const comparator = (a,b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    }

    const sortByDate = () => {
      let newtransaksi = this.state.transaksi;
      newtransaksi = this.state.transaksi.slice().sort(comparator);
      this.setState({transaksi : newtransaksi});
    };

    //Method untuk melakukan perubahan state transaksi dan menentukan jenis transaksi
    const changeData = account => produce(this.state, draft => {
      for(var i = 0; i < draft.data.length; i++){
        if(draft.data[i][3] === account){
          draft.transaksi[i][3] = draft.data[i][2];
        } else {
          for(var j = 0; j < draft.virtual.length; j++){
            if(draft.data[i][3] === draft.virtual[j][1]){
              if(draft.virtual[j][0] === account){
                draft.transaksi[i][3] = draft.data[i][2];
              }
              else{
                draft.transaksi[i][3] = draft.virtual[j][0];
              }
            }
          }
        }
        if(draft.transaksi[i][2] === account){
          draft.transaksi[i].push("DEBIT");
        } else {
          draft.transaksi[i].push("KREDIT");
        }
      }
    });

    // Get the callback from the result
    let callback = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Get return dan set state virtual
        let result = new DOMParser().parseFromString(body, 'text/xml');
        var nodeList = result.getElementsByTagName('return');
        let temp_data = [];
        for(var i = 0; i < nodeList.length; i++){
          let temp_element = nodeList[i];
          let child = [];
          child.push(temp_element.getElementsByTagName('accountnumber')[0].textContent);
          child.push(temp_element.getElementsByTagName('virtualnumber')[0].textContent);
          temp_data.push(child);
        }
        this.setState({virtual : temp_data});
        request(options2, callback2);
      }
    };

    // Get the callback from the result
    let callback2 = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Get return dan set state data, transaksi serta memanggil sortByDate()
        let result = new DOMParser().parseFromString(body, 'text/xml');
        var nodeList = result.getElementsByTagName('return');
        let temp_data = [];
        for(var i = 0; i < nodeList.length; i++){
          let temp_element = nodeList[i];
          let child = [];
          child.push(temp_element.getElementsByTagName('transactiontime')[0].textContent);
          child.push(temp_element.getElementsByTagName('amount')[0].textContent);
          child.push(temp_element.getElementsByTagName('accountnumber')[0].textContent);
          child.push(temp_element.getElementsByTagName('targetaccount')[0].textContent);
          temp_data.push(child);
        }
        this.setState({data: temp_data, transaksi: temp_data});
        console.log(this.state.transaksi);
        this.setState(changeData(account));
        sortByDate();        
        request(options3, callback3);
      }
    };

    // Get the callback from the result
    let callback3 = (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Get return dan set state balance
        let result = new DOMParser().parseFromString(body, 'text/xml');
        var nodeList = result.getElementsByTagName('return');
        let temp_acc = [];
        temp_acc.push(nodeList[0].getElementsByTagName('balance')[0].textContent);
        this.setState({balance: temp_acc});
      }
    };
    
    request(options, callback);
  }
  
  render() {
    return (
      <React.Fragment>
        <NavigationBar/>
        <div className="overflow-auto">
          <div className="history-wrapper" >
            <div className="table-responsive" id="th">
              <div className="account-balance">
                <h5>{"Your Balance is IDR "}{this.state.balance}</h5>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Waktu Transaksi</th>
                    <th scope="col">Jenis Transaksi</th>
                    <th scope="col">Jumlah Transaksi</th>
                    <th scope="col">No. Rekening Terkait</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.transaksi.map(res =>(
                      <tr key={res[0]}>
                        <td>{res[0]}</td>
                        <td>{res[4]}</td>
                        <td>{res[1]}</td>
                        <td>{res[3]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionHistory;
