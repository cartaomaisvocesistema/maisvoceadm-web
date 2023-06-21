import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './newpartner.module.scss';
import { api } from "@/services/api";
import { useRouter } from 'next/router';

export default function NewPartner() {

  const router = useRouter();
  
  const [partnernameValue, setPartnernameValue] = useState('');
  const [partnerbannerValue, setPartnerbannerValue] = useState(null);
  const [partnerdescriptionValue, setPartnerdescriptionValue] = useState('');
  const [partneremailValue, setPartneremailValue] = useState('');
  const [partnerphonenumberValue, setPartnerphonenumberValue] = useState('');
  const [partneraddressValue, setPartneraddressValue] = useState('');
  const [partnerwebsiteValue, setPartnerwebsiteValue] = useState('');
  const [partnercategoryValue, setPartnercategoryValue] = useState('');

  const [periodoManha, setPeriodoManha] = useState(false);
  const [periodoTarde, setPeriodoTarde] = useState(false);
  const [periodoNoite, setPeriodoNoite] = useState(false);

  const { user } = useContext(AuthContext)

  useEffect(() => {

  }, [])

  const addParceiro = async (e) => {
    e.preventDefault();

    const newPartner = {

      partnername: partnernameValue,
      partnerdescription: partnerdescriptionValue,
      partneremail: partneremailValue,
      partnerphonenumber: partnerphonenumberValue,
      partneraddress: partneraddressValue,
      partnerwebsite: partnerwebsiteValue,
      openinghours: 'manha, tarde, noite',
      categorypartner: '1'

    }

    console.log(newPartner);

    try {
      const response = await api.post(`/api/parceiros/`, newPartner)
      console.log(response.data.id);
      const id = response.data.id;
      if (response.status === 200) {
        const formData = new FormData();
        formData.append('image', partnerbannerValue);
        console.log(formData);
        const res = await api.post(`/api/parceiros/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        alert('Parceiro cadastrado com sucesso.');
        router.push('/partners/');
      } else {
        alert('Erro ao cadastrar parceiro.');
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main>
      <LayoutDashboard>
        <div className={styles.container}>
          <div className={styles.topbar}>
            <span className={styles.topbartitle}>Novo Parceiro</span>
          </div>
          <div className={styles.card}>
            <div className={styles.formcontainer}>
              <form onSubmit={addParceiro}>
                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="nome">
                    Nome:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="partnername"
                    name="partnername"
                    onChange={e => setPartnernameValue(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={styles.formlabel} htmlFor="descricao">
                    Banner do parceiro:
                  </label>
                  <input
                    type="file"
                    id="partnerbanner"
                    name="partnerbanner"
                    onChange={e => setPartnerbannerValue(e.target.files[0])}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="descricao">
                    Descrição:
                  </label>
                  <textarea
                    className={styles.forminputtext}
                    id="partnerdescription"
                    name="partnerdescription"
                    onChange={e => setPartnerdescriptionValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="email">
                    Email:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="email"
                    id="partneremail"
                    name="partneremail"
                    onChange={e => setPartneremailValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="telefone">
                    Telefone:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="tel"
                    id="partnerphonenumber"
                    name="partnerphonenumber"
                    onChange={e => setPartnerphonenumberValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="endereco">
                    Endereço:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="partneraddress"
                    name="partneraddress"
                    onChange={e => setPartneraddressValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="website">
                    Website:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="url"
                    id="partnerwebsite"
                    name="partnerwebsite"
                    onChange={e => setPartnerwebsiteValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="periodo">
                    Período:
                  </label>
                  <div className={styles.checkboxgroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="manha"
                        checked={periodoManha}
                        onChange={e => setPeriodoManha(!periodoManha)}
                      />
                      <span className={styles.checkbox1}>Manhã</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="tarde"
                        checked={periodoTarde}
                        onChange={e => setPeriodoTarde(!periodoTarde)}
                      />
                      <span className={styles.checkbox1}>Tarde</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="noite"
                        checked={periodoNoite}
                        onChange={e => setPeriodoNoite(!periodoNoite)}
                      />
                      <span className={styles.checkbox1}>Noite</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="categoria">
                    Categoria:
                  </label>
                  <select
                    className={styles.forminputtext}
                    id="categoria"
                    name="categoria"
                    value={partnercategoryValue}
                    onChange={e => setPartnercategoryValue(e.target.value)}
                    required
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="saude">Saúde</option>
                    <option value="comercio">Comércio</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <button className={styles.button} type="submit">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </main>
  );
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