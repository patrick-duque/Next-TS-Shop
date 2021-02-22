import {Fragment} from 'react'
import {Table, Button, Row, Col, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import Head from '../../components/Head'

interface Props {

};

const Users: React.FC<Props> = () => {
	const dispatch = useDispatch()
		return <Fragment><Head title='Admin User List' /></Fragment>;
};

export default Users;