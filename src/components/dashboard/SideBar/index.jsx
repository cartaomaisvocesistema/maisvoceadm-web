
import { useEffect, useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { MdHome, MdPerson, MdStorefront, MdLocalHospital, MdLogout, MdOutlineHandshake, MdPaid, MdInsights, MdKey, MdOutlineMessage } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

import localStorage from 'localStorage';
import { api } from '@/services/api';

import styles from './sidebar.module.scss';
import { useRouter } from 'next/router';

export default function SideBar() {

    const [isMobile, setIsMobile] = useState(false);
    const [userValue, setUserValue] = useState({});

    const router = useRouter();

    const userId = localStorage.getItem('userId')


    useEffect(() => {
        recoveryUser();
    }, [])

    // Função para verificar se a rota é a atual
    const isCurrentRoute = (route) => {
        return router.pathname === route ? styles.linkactive : styles.link;
    };

    const recoveryUser = async () => {
        try {
            const response = await api.get(`/api/usuarios/${userId}`)
            const data = response.data;
            setUserValue(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div className={styles.sidebar}>
            <div className={styles.sidebarcenter}>
                <ul className={styles.sidelinks}
                    onClick={() => setIsMobile(false)}
                >
                    <Link href='/dashboard/'>
                        <li className={isCurrentRoute('/dashboard')}>
                            <div className={styles.linkgroup}>
                                <MdHome className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Início</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='/users/'>
                        <li className={isCurrentRoute('/users')}>
                            <div className={styles.linkgroup}>
                                <MdPerson className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Usuários</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='/payments/'>
                        <li className={isCurrentRoute('/payments')}>
                            <div className={styles.linkgroup}>
                                <MdPaid className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Pagamentos</span>
                            </div>
                        </li>
                    </Link>
                    {userValue.type === 'ADM' &&
                        <Link href='./partners'>
                            <li className={isCurrentRoute('/partners')}>
                                <div className={styles.linkgroup}>
                                    <MdOutlineHandshake className={styles.sideliicon} />
                                    <span className={styles.sidelilabel}>Parceiros</span>
                                </div>
                            </li>
                        </Link>
                    }
                    {userValue.type === 'ADM' &&
                        <Link href='./management'>
                            <li className={isCurrentRoute('/management')}>
                                <div className={styles.linkgroup}>
                                    <MdInsights className={styles.sideliicon} />
                                    <span className={styles.sidelilabel}>Gestão</span>
                                </div>
                            </li>
                        </Link>
                    }
                    {userValue.type === 'ADM' &&
                        <Link href='./adms'>
                            <li className={isCurrentRoute('/adms')}>
                                <div className={styles.linkgroup}>
                                    <MdKey className={styles.sideliicon} />
                                    <span className={styles.sidelilabel}>Adm</span>
                                </div>
                            </li>
                        </Link>
                    }


                    {/*<Link href='./' className={isCurrentRoute('/')}>
                        <li className={styles.sidelimenu}>
                            <div className={styles.linkgroup}>
                                <button
                                    className={styles.mobilemenuicon}
                                    onClick={() => setIsMobile(!isMobile)}
                                >
                                    {isMobile ? <FaTimes className={styles.sideliicon} /> : <FaBars className={styles.sideliicon} />}
                                </button>
                            </div>
                        </li>
    </Link>*/}
                </ul>
            </div>
        </div>
    </>);
}