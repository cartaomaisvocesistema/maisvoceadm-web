import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";


import styles from './payments.module.scss';

export default function Payments() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    email: '',
    cpf: '',
  });
  const handleFilterSubmit = () => {
    // Lógica para lidar com o envio dos filtros
    // ...
  };
  const [payments, setPayments] = useState([
    {
      id: 1,
      usuario: 'João',
      valor: 100.00,
      status: 'Pendente',
      dataVencimento: '10/06/2023',
    },
    {
      id: 2,
      usuario: 'Pedro',
      valor: 50.00,
      status: 'Quitado',
      dataVencimento: '05/06/2023',
    },
    // Adicione mais pagamentos aqui
  ]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const { user } = useContext(AuthContext)

  useEffect(() => {
    //api.get('/users')
  }, [])

  const handleDeletePayment = (paymentId) => {
    setPaymentToDelete(paymentId);
    setShowConfirmationModal(true);
  };

  const confirmDeletePayment = () => {
    if (paymentToDelete) {
      const updatedPayments = payments.filter(payment => payment.id !== paymentToDelete);
      setPayments(updatedPayments);
      setShowConfirmationModal(false);
      setPaymentToDelete(null);
    }
  };

  const cancelDeletePayment = () => {
    setShowConfirmationModal(false);
    setPaymentToDelete(null);
  };

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Pagamentos</span>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>{payments.length}</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.carddescription}>Pagamentos em Aberto</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>0</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsred}></div>
                    <span className={styles.carddescription}>Pagamentos Vencidos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.headtable}>
              <div className={styles.ctpainel}>
                <Link href='/newpayment' className={styles.btnewuser}>Novo pagamento</Link>

                <button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>

              </div>

              <div className={styles.pagination}>
                <Link href=''>
                  <IoIosArrowBack />
                </Link>
                <span className={styles.paginationnumber}>1</span>
                <Link href=''>
                  <IoIosArrowForward />
                </Link>
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Usuário</th>
                  <th className={styles.th}>Valor</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Data de Vencimento</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className={styles.tr}>
                    <td className={styles.td}>{payment.usuario}</td>
                    <td className={styles.td}>{payment.valor}</td>
                    <td className={styles.td}>{payment.status}</td>
                    <td className={styles.td}>{payment.dataVencimento}</td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <Link href={`/editpayment?id=${payment.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {isFilterOpen && (
                <div className={styles.filterbox}>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="usuario">Usuário:</label>
                    <select
                      className={styles.forminputtext}
                      value={filterValues.usuario}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, usuario: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="usuario1">Usuário 1</option>
                      <option value="usuario2">Usuário 2</option>
                      <option value="usuario3">Usuário 3</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="status">Status:</label>
                    <select
                      className={styles.forminputtext}
                      value={filterValues.status}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, status: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="quitado">Quitado</option>
                      <option value="pendente">Pendente</option>
                      <option value="atrasado">Atrasado</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="valor">Valor:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Valor"
                      value={filterValues.valor}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, valor: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.ctbuttons}>
                    <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                    <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                  </div>
                </div>
              )}

            </div>
            {showConfirmationModal && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h3>Confirmar exclusão</h3>
                  <p>Deseja realmente excluir este pagamento?</p>
                  <div className={styles.modalButtons}>
                    <button className={styles.confirmButton} onClick={confirmDeletePayment}>Confirmar</button>
                    <button className={styles.cancelButton} onClick={cancelDeletePayment}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </LayoutDashboard>
      </main>
    </>
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