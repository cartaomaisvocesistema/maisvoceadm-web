import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './newuser.module.scss';
import { useRouter } from 'next/router';

export default function NewUser() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('BOLETO');

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [typeUserValue, setTypeUserValue] = useState('C_TITULAR');

  const [paymentTypeValue, setPaymentTypeValue] = useState('1');
  const [cardNumberValue, setCardNumberValue] = useState('');
  const [nameTitularValue, setNameTitularValue] = useState('');
  const [validadeValue, setValidadeValue] = useState('');
  const [cvvValue, setCvvValue] = useState('');
  const [agreementTypeValue, setAgreementTypeValue] = useState('STANDARD');


  const { user } = useContext(AuthContext);

  useEffect(() => {

  }, [])

  function resetSignatureCredit() {
    setCardNumberValue('');
    setNameTitularValue('');
    setValidadeValue('');
    setCvvValue('');
  }

  function handleOptions(event) {
    const { value } = event.target;
    if (value === 'UNDEFINED' || value === 'BOLETO') {
      resetSignatureCredit();
    }
    setOpcaoSelecionada(value);
  }

  function handleOptionsAgreement(event) {
    const { value } = event.target;
    setAgreementTypeValue(value);
  }

  function handleChangeMaskCvv(e) {
    const { value } = e.target;
    setCvvValue(cvvMask(value));
  }

  const cvvMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .substr(0, 3);
  };

  function handleChangeMaskDate(e) {
    const { value } = e.target;
    setValidadeValue(dateMask(value));
  }

  const dateMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2")
      .trim()
      .substr(0, 5);
  };

  function handleChangeMaskCreditCard(e) {
    const { value } = e.target;
    setCardNumberValue(creditCardMask(value));
  }

  const creditCardMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
      .trim()
      .substr(0, 19);
  };

  function handleChangeMaskCpf(e) {
    const { value } = e.target;
    setCpfValue(cpfMask(value))
  }

  const cpfMask = value => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const handleChangeMaskPhone = (e) => {
    const { value } = e.target
    setPhoneValue(phoneMask(value))
  }

  const phoneMask = (value) => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
  }

    const [birthDateValue, setBirthDateValue] = useState('');
  
    const handleChangeMaskBirthDate = (e) => {
      const { value } = e.target;
      setBirthDateValue(maskBirthDate(value));
    };
  
    const maskBirthDate = (value) => {
      if (!value) return '';
  
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
    };


  const confirmarDadosEPagamento = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (passwordValue != confirmPasswordValue) {
      alert('Campos de senha e confirme sua senha estão diferentes');
    } else {

      let pt = '';
      if (opcaoSelecionada === 'UNDEFINED') {
        pt = paymentTypeValue;
      } else {
        if (opcaoSelecionada === 'BOLETO') {
          pt = '5';
        } else {
          if (opcaoSelecionada === 'CREDIT_CARD') {
            pt = '6';
          }
        }
      }

      const newUser1 = {
        username: usernameValue,
        email: emailValue,
        cpf: cpfValue.toString().replace(/\.|-/gm, ''),
        address: addressValue,
        phone: phoneValue.toString().replace(/\D/g, ''),
        password: passwordValue,
        type: typeUserValue,
        selectedOption: opcaoSelecionada,
        paymenttype: pt,
        agreementType: agreementTypeValue,
        dateOfBirth: birthDateValue
      }

      let newUser = {
        ...newUser1
      };


      if (opcaoSelecionada === 'CREDIT_CARD') {
        const newUserCredit = {
          cardnumber: cardNumberValue.replace(/\s/g, ""),
          nametitular: nameTitularValue,
          validade: validadeValue,
          ccv: cvvValue
        }

        newUser = {
          ...newUser1,
          ...newUserCredit
        };

      }

      try {
        const response = await api.post(`/api/usuarios/`, newUser)
        if (response.status === 200) {
          alert('Usuario cadastrado com sucesso.');
          router.push('/users/');
        } else {
          alert('Erro ao cadastrar usuario.');
        }
      } catch (error) {
        alert('Erro ao cadastrar usuario.');
        console.log(error)
      }

    }
    setLoading(false);

  }
  
  const cadastrarApenasDados = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (passwordValue != confirmPasswordValue) {
      alert('Campos de senha e confirme sua senha estão diferentes');
    } else {

      let pt = '';
      if (opcaoSelecionada === 'UNDEFINED') {
        pt = paymentTypeValue;
      } else {
        if (opcaoSelecionada === 'BOLETO') {
          pt = '5';
        } else {
          if (opcaoSelecionada === 'CREDIT_CARD') {
            pt = '6';
          }
        }
      }

      const newUser1 = {
        username: usernameValue,
        email: emailValue,
        cpf: cpfValue.toString().replace(/\.|-/gm, ''),
        address: addressValue,
        phone: phoneValue.toString().replace(/\D/g, ''),
        password: passwordValue,
        type: typeUserValue,
        selectedOption: opcaoSelecionada,
        paymenttype: pt,
        agreementType: agreementTypeValue,
        dateOfBirth: birthDateValue
      }

      let newUser = {
        ...newUser1
      };


      if (opcaoSelecionada === 'CREDIT_CARD') {
        const newUserCredit = {
          cardnumber: cardNumberValue.replace(/\s/g, ""),
          nametitular: nameTitularValue,
          validade: validadeValue,
          ccv: cvvValue
        }

        newUser = {
          ...newUser1,
          ...newUserCredit
        };

      }

      try {
        const response = await api.post(`/api/usuarios/userdata`, newUser)
        if (response.status === 200) {
          alert('Dados do Usuario cadastrados com sucesso.');
          router.push('/users/');
        } else {
          alert('Erro ao cadastrar usuario.');
        }
      } catch (error) {
        alert('Erro ao cadastrar usuario.');
        console.log(error)
      }

    }
    setLoading(false);

  }
  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Novo Usuário</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <div className={styles.sectiontitle}>Dados pessoais</div>
                <form>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="username"
                      name="username"
                      maxLength="70"
                      placeholder="ex. João da Silva"
                      onChange={e => setUsernameValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input
                      className={styles.forminputtext}
                      type="email"
                      id="email"
                      name="email"
                      maxLength="70"
                      placeholder="joao@gmail.com"
                      onChange={e => setEmailValue(e.target.value)}
                      />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cpf">CPF:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="cpf"
                      name="cpf"
                      maxLength="14"
                      value={cpfValue}
                      placeholder="000.000.000-00"
                      onChange={e => handleChangeMaskCpf(e)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="birthDate">Data de Nascimento</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      maxLength="10"
                      value={birthDateValue}
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => handleChangeMaskBirthDate(e)}
                      required
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="address">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="address"
                      name="address"
                      maxLength="70"
                      placeholder="ex. Rua José Pedro da Silva"
                      onChange={e => setAddressValue(e.target.value)}
                      />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="phone">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="phone"
                      name="phone"
                      maxLength="15"
                      value={phoneValue}
                      placeholder="(53)99999-9999"
                      onChange={e => handleChangeMaskPhone(e)}
                      />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="password">Senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="password"
                      name="password"
                      maxLength="70"
                      onChange={e => setPasswordValue(e.target.value)}
                      required
                    />
                    <label className={styles.formlabel} htmlFor="password">Confirme sua senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="confirmpassword"
                      name="confirmpassword"
                      maxLength="70"
                      onChange={e => setConfirmPasswordValue(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select
                      className={styles.forminputtext}
                      id="tipo"
                      name="tipo"
                      required
                      disabled>
                      <option value="C_TITULAR">Titular</option>
                    </select>
                  </div>

                  <div className={styles.sectiontitle}>Escolher plano</div>

                  <div className={styles.formgrouppayment}>
                    <div className={styles.checkboxgrouppayment}>
                      <div className={(agreementTypeValue === 'STANDARD') ? styles.cardplan : styles.cardplanopacity}>
                        <label>
                          <input
                            className={styles.radioagreement}
                            type="radio"
                            name="agreementtype"
                            value="STANDARD"
                            checked={agreementTypeValue === 'STANDARD'}
                            onChange={e => handleOptionsAgreement(e)}

                          />
                          <span className={styles.checkbox1}><b>Plano Cartão Mais Você - R$49,90</b></span>
                          <br />
                          <span className={styles.paragraph2}>No Plano Padrão do Cartão Mais Você, com uma mensalidade de R$49,90 o cliente tem direito a descontos exclusivos em todos os parceiros do cartão. Também pode adicionar 4 dependentes gratúitos e para os demais dependentes extra será adicionado o valor de 9,90 para cada dependente extra.</span>
                        </label>
                      </div>
                      <div className={(agreementTypeValue === 'PLUS') ? styles.cardplan : styles.cardplanopacity}>
                        <label>
                          <input
                            type="radio"
                            className={styles.radioagreement}
                            name="agreementtype"
                            value="PLUS"
                            checked={agreementTypeValue === 'PLUS'}
                            onChange={e => handleOptionsAgreement(e)}
                          />
                          <span className={styles.checkbox1}><b>Plano Cartão Mais Você Plus - R$119,90</b></span>
                          <br />
                          <span className={styles.paragraph2}>No Plano Plus do Cartão Mais Você, com uma mensalidade de R$119,90, o cliente tem direito a todos os descontos de parceiros e acesso livre às consultas na clinica Marmed, parceira do Cartão Mais Você. Neste plano é possível incluir até 4 dependentes Gratúitos, com o adicional de 29,90 na assinatura para cada dependente extra além dos gratúitos.</span>
                        </label>
                      </div>
                    </div>

                  </div>


                  <div className={styles.sectiontitle}>Pagamentos</div>

                  <div className={styles.formgrouppayment}>
                    <div className={styles.checkboxgrouppayment}>
                      <label>
                        <input
                          name="typepayment"
                          type="radio"
                          value="BOLETO"
                          checked={opcaoSelecionada === 'BOLETO'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Boleto</span>
                      </label>
                      <br />
                      <label>
                        <input
                          name="typepayment"
                          type="radio"
                          value="CREDIT_CARD"
                          checked={opcaoSelecionada === 'CREDIT_CARD'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Cartão de crédito</span>
                      </label>
                      <div className={styles.formgroup}>
                        <label className={styles.formlabelsemnegrito} htmlFor="cardnumber">Número do cartão:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          value={cardNumberValue}
                          maxLength="19"
                          placeholder="0000 0000 0000 0000"

                          onChange={e => handleChangeMaskCreditCard(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="nametitular">Nome do titular:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="nametitular"
                          name="nametitular"
                          value={nameTitularValue}
                          maxLength="70"
                          placeholder="ex. João da Silva"
                          onChange={e => setNameTitularValue(e.target.value)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="validade">Validade:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="validade"
                          name="validade"
                          value={validadeValue}
                          maxLength="5"
                          placeholder="10/10"
                          onChange={e => handleChangeMaskDate(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="cvv">CVV:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cvvValue}
                          maxLength="3"
                          placeholder="123"
                          onChange={e => handleChangeMaskCvv(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />
                      </div>
                      <label>
                        <input
                          type="radio"
                          name="typepayment"
                          value="UNDEFINED"
                          checked={opcaoSelecionada === 'UNDEFINED'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento no balcão</span>
                      </label>
                      <div className={styles.formgroup}>
                        <label className={styles.formlabelsemnegrito} htmlFor="paymenttype1">Forma de pagamento:</label>
                        <select
                          className={styles.forminputtext}
                          id="paymenttype1"
                          name="paymenttype1"
                          value={paymentTypeValue}
                          onChange={e => setPaymentTypeValue(e.target.value)}
                          required
                          disabled={!(opcaoSelecionada === 'UNDEFINED')}
                        >
                          <option value="1">Cartão de Crédito</option>
                          <option value="2">Cartão de Debito</option>
                          <option value="3">Dinheiro</option>
                          <option value="4">Pix</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.button}
                    type="submit"
                    onClick={cadastrarApenasDados}
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Cadastrar Apenas Dados'}
                  </button>
                  <br/>
                  <button
                    className={styles.button}
                    type="submit"
                    onClick={confirmarDadosEPagamento}
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Confirmar Dados e Forma de Pagamento'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </LayoutDashBoard >
      </main >
    </>
  )
}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx);
  const { ['nextAuth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  //await apiClient.get('/users');

  return {
    props: {}
  }

}