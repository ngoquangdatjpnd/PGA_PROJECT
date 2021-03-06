import { FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { ValidationSchema } from '../../utils/valid';
import {createAcessLevelUser, CreateTypeUser, membership} from '../../utils/utils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../styles/CreateUserStyle.css'
import CreateLabelForm from '../CreateUserForm/CreateLabelForm';
import { IApiCreateUser, IInfoUser, info, IUser } from '../../../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../common/redux/thunk';
import { IAdministrator } from '../../../../models/common';

const { Option } = Select;
interface Props {
    data? : info
    setLoading(e : boolean) : void
}

const CreateUserForm = (props : Props) =>{

    const openNotification = (placement : any,message : string,desc : string) => {
        notification.info({
          message: message,
          description:
            desc,
          placement,
        });
    };
    const {data,setLoading} = props;

    const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<String>>>();
    const formik = useFormik({
        initialValues :{
            firstname: '',
            lastname :'',
            email : '',
            password : '',
            confirmpassword :'',
        },
       validationSchema : ValidationSchema,
       onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    const [check,setCheck] = React.useState(false);

    useEffect(() =>{
        if(formik.values.firstname !== "" && formik.isValid === true ) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    },[formik.isValid])

    const role = useSelector((state: AppState) => 
        state.common.role
    )
    
    const [type,setType] = React.useState("individual");
    const [changePassword,setChangePassword] = React.useState(0);
    const [tax,setTax] = React.useState(0);
    const [accessLevel,setAccessLevel] = React.useState("10");
    const [roleType,setRoleType] = React.useState<Array<string> | undefined>(undefined);
    const [membershipId,setMembershipId] = React.useState("");

    const fetchCreateUser = React.useCallback(async () =>{
        setLoading(true)
        const json = await dispatch(fetchThunk(API_PATHS.userCreate,'post',{
            access_level: accessLevel,
            confirm_password: formik.values.confirmpassword,
            email: formik.values.email,
            firstName: formik.values.firstname,
            forceChangePassword: changePassword,
            lastName: formik.values.lastname,
            membership_id: membershipId,
            password: formik.values.password,
            paymentRailsType: type,
            taxExempt: tax,
            roles : roleType
        }));
        if(json.success == true) {
            openNotification('bottom','Succesfully',"Create User successfully")
        } else {
            openNotification('bottom','error',json.errors)
        }
        setLoading(false)
    },[formik.values]);

    const handleChangeType = (value : any) =>{
        setType(value);
    }

    const handleChangeAccessLevel = (value : any) =>{
        setAccessLevel(value);
    }

    const handleChangeMembership = (value : any) =>{
        setMembershipId(value);
    }
    
    const handleChangeForcePassword = (e : any) =>{
        if(e.target.checked) {
            setChangePassword(1);
        } else {
            setChangePassword(0);
        }
    }

    const handleChangeTax = (e : any) =>{
        if(e.target.checked) {
            setTax(1);
        } else {
            setTax(0);
        }
    }

    const handleChangeRoles = (value : any) =>{
        setRoleType(value);
    }

    const handleClick = () =>{
        fetchCreateUser();
    }

    return (
        <Form className ="form-create" >
            <Button type="primary" style ={{marginLeft : '40px',marginTop :'30px'}} shape="circle" > <Link to="/pages/users/manage-user" ><ArrowBackIcon sx={{color:'#fff'}}/></Link></Button>
            <div className='form-create-div1'>
                <label className="title" style={{width : '100%'}}>Create Profile</label>
                <label className="text" style={{width : '100%'}}>Email & password</label>
                <div>
                        
                        <label>First Name<span _ngcontent-gpk-c172="" className="text-danger">*</span></label>
                        <div className="valid-form">
                           <Input 
                               defaultValue='haha'
                                name='firstname'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}></Input>
                           {formik.touched.firstname && Boolean(formik.errors.firstname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.firstname}</FormHelperText>) : null }
                        </div>
                        <div></div>
                </div>
                <div>
                        <label>Last Name<span _ngcontent-gpk-c172="" className="text-danger">*</span></label>
                        <div className="valid-form">
                             <Input
                             name="lastname"
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.lastname}
                             ></Input>
                             {formik.touched.lastname && Boolean(formik.errors.lastname) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.lastname}</FormHelperText>) : null }
                        </div>
 
                </div>
                <div>
                        
                        <label>Email<span _ngcontent-gpk-c172="" className="text-danger">*</span></label>
                        <div className="valid-form">
                            <Input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}></Input>
                            {formik.touched.email && Boolean(formik.errors.email) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.email}</FormHelperText>) : null }
                        </div>
                        
                </div>
                <div>
                        
                        <label>Password<span _ngcontent-gpk-c172="" className="text-danger">*</span></label>
                        <div className="valid-form">
                            <Input type="password"
                            name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}                  
                            ></Input>
                            {formik.touched.password && Boolean(formik.errors.password) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.password}</FormHelperText>) : null }
                        </div>
                </div>
                <div>
                        
                        <label>Confirm Password<span _ngcontent-gpk-c172="" className="text-danger">*</span></label>
                        <div className="valid-form">
                            <Input type="password"
                            name="confirmpassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmpassword}></Input>
                            {formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword) ? (<FormHelperText sx={{color:'red'}}>{formik.errors.confirmpassword}</FormHelperText>) : null }
                        </div>
                </div>
                <div>               
                        <label>Type</label>
                        <Select style={{width : '400px',margin :'0px'}} defaultValue = "Individual" onChange={handleChangeType}>
                            {
                                CreateTypeUser.map((e,index : number) =>(
                                    <Option key={index} value={e.value} label={e.label}>{e.label}</Option>
                                ))
                            }
                        </Select>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Acess information</label>
                <div>               
                        <label>Acess Level</label>
                        <Select style={{width : '400px',margin :'0px'}}defaultValue ="Vendor" 
                         onChange = {handleChangeAccessLevel} >
                            {
                                createAcessLevelUser.map((e,index : number) =>(
                                    <Option key={index} value={e.value} label={e.label}>{e.label}</Option>
                                ))
                            }
                        </Select>
                </div>
                {
                    (accessLevel === "100") ? (
                        <div>               
                                <label>Roles</label>
                                <Select style={{width : '400px',margin :'0px'}}  mode="tags" onChange ={handleChangeRoles} >
                                    { role ? role.administrator.map((e : IAdministrator,index : number) =>(
                                        <Option key={index} value={e.id} >{e.name}</Option>
                                        )) : null
                                    }
                                </Select>
                        </div>
                    ) : null
                }
                <div>               
                        <label>Memberships</label>
                        <Select style={{width : '400px',margin :'0px'}} defaultValue = "Ignore Membership" onChange = {handleChangeMembership} >
                            {
                                membership.map((e,index : number) =>(
                                    <Option key={index} value={e.value} label={e.label}>{e.label}</Option>
                                ))
                            }
                        </Select>
                </div>
                <div>
                        <label>Require to change password on next log in</label>
                        <div>
                            <Checkbox onChange={handleChangeForcePassword}></Checkbox>
                        </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <div className='form-create-div1'>
            <label className="text" style={{width : '100%'}}>Tax information</label>
                <div>   
                    <label>Tax exempt</label>
                    <div>
                            <Checkbox onChange= {handleChangeTax}></Checkbox>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor : '#323259' ,height:'30px'}}></div>
            <CreateLabelForm check={check} fetchCreateUser={fetchCreateUser} />
        </Form>
    )
}

export default React.memo(CreateUserForm);