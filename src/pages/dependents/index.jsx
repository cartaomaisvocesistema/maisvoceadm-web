import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsPersonFillGear } from "react-icons/bs";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import { useRouter } from 'next/router';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './dependents.module.scss';

export default function Dependents() {

  const router = useRouter();

  const [btnNewDependentShow, setBtnNewDependentShow] = useState(true);

  const [dependentsList, setDependentsList] = useState([]);
  const [titularValue, setTitularValue] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDependentId, setSelectedDependentId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    cardNumber: '',
    username: '',
    cpf: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleFilterSubmit = async () => {
    // Lógica para lidar com o envio dos filtros
    // ...
    const response = await api.post('/api/usuarios/getbyfilter', filterValues)
    const result = (response).data;
    setDependentsList(result.users)
    setIsFilterOpen(!isFilterOpen)
  };

  const handleFilterClear = async () => {
    filterValues.username = '';
    filterValues.cardNumber = '';
    filterValues.cpf = '';
    filterValues.email = '';
    filterValues.phone = '';
    filterValues.address = '';

    const response = await api.post('/api/usuarios/getbyfilter', filterValues)
    const result = (response).data;
    setDependentsList(result.users)
    setIsFilterOpen(!isFilterOpen)

  };

  const handleDeleteUser = async () => {
    // Remova o usuário da lista com base no selectedUserId
    // Por exemplo:
    await deleteDependentes();
    await getListaDependentes();

    // Feche a modal e redefina o ID do usuário selecionado

    setIsModalOpen(false);
    setSelectedDependentId(null);
  };

  useEffect(() => {
    getListaDependentes();
  }, []);

  const getListaDependentes = async () => {
    const { cardnumber } = router.query;

    console.log()
    const response = await api.get(`/api/usuarios/getdependents/${cardnumber}`)
    const result = (response).data;
    const  dpList = result.users.filter(user => user.type !== 'C_TITULAR')
    setDependentsList(dpList)
    if(dpList.length >= 4) {
      setBtnNewDependentShow(false);
    }

    setTitularValue(result.users.filter(user => user.type == 'C_TITULAR')[0]);
  }

  const deleteDependentes = async () => {
    const response = await api.delete(`/api/usuarios/${selectedDependentId}`)
  }

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Usuários</span>
            </div>
            <div>
              {isFilterOpen && (
                <div className={styles.filterbox}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cardNumber">Nº Cartão:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Nº cartão"
                      value={filterValues.cardNumber}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, cardNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Nome"
                      value={filterValues.username}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, username: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">CPF:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="CPF"
                      value={filterValues.cpf}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, cpf: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Email"
                      value={filterValues.email}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, email: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Telefone"
                      value={filterValues.phone}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Endereço"
                      value={filterValues.address}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, address: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.ctbuttons}>
                    <button className={styles.button} onClick={handleFilterClear}>Limpar</button>
                    <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                    <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                  </div>
                </div>
              )}

            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardtitular}>
                  <span className={styles.cardtitulartitle}>
                    Titular do cartão Nº: {titularValue.cardNumber}
                  </span>
                  <div className={styles.cardtitularinfo}>
                    <div className={styles.cardtitulargrouplabel}>
                      <label className={styles.formlabel} htmlFor="nome">Nome:</label><span className={styles.formlabelvalue}>{titularValue.username}</span>
                    </div>
                    <div className={styles.cardtitulargrouplabel}>
                      <label className={styles.formlabel} htmlFor="email">Email:</label><span className={styles.formlabelvalue}>{titularValue.email}</span>
                    </div>
                    <div className={styles.cardtitulargrouplabel}>
                      <label className={styles.formlabel} htmlFor="cpf">Cpf:</label><span className={styles.formlabelvalue}>{titularValue.cpf}</span>
                    </div>
                    <div className={styles.cardtitulargrouplabel}>
                      <label className={styles.formlabel} htmlFor="phone">Telefone:</label><span className={styles.formlabelvalue}>{titularValue.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.headtable}>
              {btnNewDependentShow ? (
                <Link
                  href={`/newdependent?cardnumber=${titularValue.cardNumber}`}
                  className={styles.btnewuser}
                  aria-disabled
                >Novo dependente
                </Link>
              ) : (
                <span className={styles.btnewuserdisabled}>Novo dependente</span>
              )}

              <button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Nº Cartão</th>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>CPF</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Telefone</th>
                  <th className={styles.th}>Endereço</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {dependentsList.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdcenter}>{user.cardNumber}</td>
                    <td className={styles.tdcenter}>{user.username}</td>
                    <td className={styles.tdcenter}>{user.cpf}</td>
                    <td className={styles.tdcenter}>{user.email}</td>
                    <td className={styles.tdcenter}>{user.phone}</td>
                    <td className={styles.tdcenter}>{user.address}</td>
                    <td className={`${styles.tdcenter} ${styles.tdcenter}`}>
                      <Link href={`/edituser?id=${user.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <RiDeleteBinLine onClick={() => {
                        setSelectedDependentId(user.id);
                        setIsModalOpen(true);
                      }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Excluir Usuário</h2>
                  <p>Deseja realmente excluir este usuário?</p>
                  <div className={styles.modalButtons}>
                    <button onClick={handleDeleteUser}>Excluir</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </LayoutDashBoard>
      </main>
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
