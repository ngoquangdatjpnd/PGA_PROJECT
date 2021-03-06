import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { IApiGetUsers, IUserList } from '../../../models/user';
import { AppState } from '../../../redux/reducer';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import { fetchThunk } from '../../common/redux/thunk';
import SeacrhFormComponent from '../components/UserListForm/SearchFormComponent';
import EnhancedTableHead from '../components/UserListForm/EnhancedTableHead';
import PaginationComponent from '../components/UserListForm/PaginationComponent';
import TableUserComponent from '../components/UserListForm/TableUserComponent';
import { initUserState } from '../redux/userReducer';
import {ICountry, IState} from '../../../models/common'
import { Box, Button, Paper, Table, TableContainer } from '@mui/material';
import {setApiGetUsers} from '../redux/userReducer';
import { Link } from 'react-router-dom';
import '../styles/UserListStyle.css';
import DeleteForm from '../components/UserListForm/DeleteForm';
import { Modal, Spin } from 'antd';

const UserListPage = () =>{
    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const [apiGetUser,setApiGetUser] = React.useState<IApiGetUsers>(initUserState.apigetusers);
    const [data,setData] = React.useState<Array<IUserList>>([]);
    const [record,setRecord] = React.useState("");
    const [checkReload,setCheckReload] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const fetchUser = useCallback(async () =>{
        setLoading(true);
        const json = await dispatch(fetchThunk(API_PATHS.userList,'post',apiGetUser));
        if(json.data === false) {
           setData([]);
       } else {
          setData(json.data);
          setRecord(json.recordsTotal)
          dispatch(setApiGetUsers(apiGetUser))
       }
       setLoading(false);
   },[apiGetUser]);
   
   useEffect(() => {
       fetchUser();
   },[apiGetUser])

    return (
    
    <div style ={{display : 'flex',backgroundColor :'#1b1b38'}}>
        
        <MenuHeaderComponent />
        {loading ?  <Modal visible = {true} footer={null} destroyOnClose={true} ><Spin style={{marginLeft : '225px'}}/></Modal> :
        <div style ={{marginTop :'80px'}}> 
           <div style={{ marginLeft:'60px',marginTop :'30px'}}>
               <h2 style={{color :'white'}}>User</h2>
           </div>
           <SeacrhFormComponent api={apiGetUser} setApi = {setApiGetUser} />
           <div style={{ margin:'60px'}}>
           <div style={{marginBottom : '30px'}}>
                <Button variant='contained' ><Link style={{color:'white'}} to= '/pages/users/new-user'>Add User</Link></Button>
            </div>
            <Box sx={{ width: '100%',backgroundColor : '#323259' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer sx={{backgroundColor : '#323259'}}>
                        <Table sx={{minwidth : 750}}>
                           <EnhancedTableHead apiGetUser ={apiGetUser} setApiGetUser ={setApiGetUser}/>
                           <TableUserComponent data={data} />
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
           <PaginationComponent apiGetUser ={apiGetUser} setApiGetUser ={setApiGetUser} record ={record}/>
           </div> 
        </div> }
        <DeleteForm api={apiGetUser} setApi={setApiGetUser} setCheckReload={setCheckReload} />
    </div>
    )
}

export default React.memo(UserListPage);