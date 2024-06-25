import React, { useState, useEffect } from 'react';
import { Table, Button, Input, notification, Select, DatePicker } from 'antd';
import UserService from '../services/UserService';
import countries from '../constants/countries';
import dayjs from 'dayjs';
import './profile.css';
import NavBar from './NavBar';

const { Option } = Select;

const Profile = () => {
    const [profile, setProfile] = useState({
        idNumber: '',
        phoneNumber: '',
        address: '',
        nationality: '',
        educationLevel: '',
        maritalStatus: '',
        birthday: '',
    });

    const [editing, setEditing] = useState(false);

    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await UserService.getYourProfile(token);
            setProfile(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value, name) => {
        setProfile({ ...profile, [name]: value });
    };

    const handleDateChange = (date, dateString) => {
        setProfile({ ...profile, birthday: dateString });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await UserService.updateProfile(profile, token);
            setEditing(false);
            await fetchProfile();
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating your profile.',
            });
        }
    };

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
            width: '30%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => (
                editing ? (
                    record.key === 'educationLevel' || record.key === 'maritalStatus' ? (
                        <Select
                            value={profile[record.key]}
                            onChange={(value) => handleSelectChange(value, record.key)}
                            style={{ width: '100%' }}
                        >
                            {record.key === 'educationLevel' ? (
                                <>
                                    <Option value="Primary">Primary</Option>
                                    <Option value="Secondary">Secondary</Option>
                                    <Option value="University">University</Option>
                                    <Option value="PhD">PhD</Option>
                                </>
                            ) : (
                                <>
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                </>
                            )}
                        </Select>
                    ) : record.key === 'nationality' ? (
                        <Select
                            value={profile[record.key]}
                            onChange={(value) => handleSelectChange(value, record.key)}
                            style={{ width: '100%' }}
                        >
                            {countries.map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    ) : record.key === 'birthday' ? (
                        <DatePicker
                            value={profile.birthday ? dayjs(profile.birthday) : null}
                            onChange={handleDateChange}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <Input name={record.key} value={profile[record.key]} onChange={handleChange} />
                    )
                ) : (
                    text
                )
            ),
        }
    ];

    const data = [
        { key: 'idNumber', field: 'ID Number', value: profile?.idNumber },
        { key: 'phoneNumber', field: 'Phone Number', value: profile?.phoneNumber },
        { key: 'address', field: 'Address', value: profile?.address },
        { key: 'nationality', field: 'Nationality', value: profile?.nationality },
        { key: 'educationLevel', field: 'Education Level', value: profile?.educationLevel },
        { key: 'maritalStatus', field: 'Marital Status', value: profile?.maritalStatus },
        { key: 'birthday', field: 'Birthday', value: profile?.birthday ? dayjs(profile?.birthday).format('YYYY MMMM DD') : '' },
    ];

    return (
        <div>

        <NavBar />
        <div className="profile-container">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                footer={() => (
                    <Button type="primary" onClick={editing ? handleSubmit : () => setEditing(true)}>
                        {editing ? 'Submit Changes' : 'Edit'}
                    </Button>
                )}
                className="profile-table"
            />
        </div>
        </div>
    );
};

export default Profile;
