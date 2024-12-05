import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Button,
  Modal,
  Input,
  InputNumber,
  Select,
  message,
  Upload
} from 'antd'
import { EditOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { updateProfile, addCity, removeCity, updateProfilePicture } from '../../store/slices/profileSlice';

const { Option } = Select

const Profile = () => {
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [profileModal, setProfileModal] = useState(false)
  const [contactModal, setContactModal] = useState(false)
  const [serviceModal, setServiceModal] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [tempProfileData, setTempProfileData] = useState({})

  const handleProfileEdit = () => {
    setTempProfileData({
      name: profile.name,
      location: profile.location,
      profilePicture: profile.profilePicture
    })
    setProfileModal(true)
  }

  const handleContactEdit = () => {
    setTempProfileData({
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address
    })
    setContactModal(true)
  }

  const handleServiceEdit = () => {
    setTempProfileData({
      courierBuses: profile.courierBuses,
      courierDrivers: profile.courierDrivers,
      citiesServiced: [...profile.citiesServiced]
    })
    setServiceModal(true)
  }

  const handleProfileSave = () => {
    dispatch(updateProfile(tempProfileData))
    setProfileModal(false)
    message.success('Profile updated successfully')
  }

  const handleContactSave = () => {
    dispatch(updateProfile(tempProfileData))
    setContactModal(false)
    message.success('Contact details updated successfully')
  }

  const handleServiceSave = () => {
    dispatch(updateProfile(tempProfileData))
    setServiceModal(false)
    message.success('Service details updated successfully')
  }

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      dispatch(updateProfilePicture(e.target.result))
      setTempProfileData({ ...tempProfileData, profilePicture: e.target.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Profile Section */}
      <Card className="shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setPreviewVisible(true)}
              className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md"
            >
              <EyeOutlined />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-500">{profile.location}</p>
          </div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleProfileEdit}
            className="ml-auto"
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Contact Details Section */}
      <Card title="Contact Details" className="shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone Number:</span>
            <span>{profile.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{profile.address}</span>
          </div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleContactEdit}
            className="mt-4"
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Service Details Section */}
      <Card title="Service Details" className="shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Number Of Courier Buses:</span>
            <span>{profile.courierBuses}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Number Of Courier Drivers:</span>
            <span>{profile.courierDrivers}</span>
          </div>
          <div>
            <span className="font-medium">Cities Serviced:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.citiesServiced.map((city, index) => (
                <div
                  key={city}
                  className="px-3 py-1 bg-gray-100 rounded-full flex items-center"
                >
                  {`${index + 1}. ${city}`}
                </div>
              ))}
            </div>
          </div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleServiceEdit}
            className="mt-4"
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Profile Modal */}
      <Modal
        title="Edit Profile"
        open={profileModal}
        onOk={handleProfileSave}
        onCancel={() => setProfileModal(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Profile Picture</label>
            <Upload
              showUploadList={false}
              customRequest={handleImageUpload}
              className="cursor-pointer"
            >
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={tempProfileData.profilePicture || profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Upload>
          </div>
          <div>
            <label className="block mb-1">Company Name</label>
            <Input
              value={tempProfileData.name}
              onChange={(e) =>
                setTempProfileData({ ...tempProfileData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <Input
              value={tempProfileData.location}
              onChange={(e) =>
                setTempProfileData({ ...tempProfileData, location: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        title="Edit Contact Details"
        open={contactModal}
        onOk={handleContactSave}
        onCancel={() => setContactModal(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <Input
              value={tempProfileData.email}
              onChange={(e) =>
                setTempProfileData({ ...tempProfileData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <Input
              value={tempProfileData.phoneNumber}
              onChange={(e) =>
                setTempProfileData({ ...tempProfileData, phoneNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <Input
              value={tempProfileData.address}
              onChange={(e) =>
                setTempProfileData({ ...tempProfileData, address: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>

      {/* Service Modal */}
      <Modal
        title="Edit Service Details"
        open={serviceModal}
        onOk={handleServiceSave}
        onCancel={() => setServiceModal(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Number of Courier Buses</label>
            <InputNumber
              value={tempProfileData.courierBuses}
              onChange={(value) =>
                setTempProfileData({ ...tempProfileData, courierBuses: value })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Number of Courier Drivers</label>
            <InputNumber
              value={tempProfileData.courierDrivers}
              onChange={(value) =>
                setTempProfileData({ ...tempProfileData, courierDrivers: value })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Cities Serviced</label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select cities"
              value={tempProfileData.citiesServiced}
              onChange={(values) =>
                setTempProfileData({ ...tempProfileData, citiesServiced: values })
              }
            >
              {profile.availableCities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title="Profile Picture"
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          src={profile.profilePicture}
          alt="Profile Preview"
          className="w-full"
        />
      </Modal>
    </div>
  )
}

export default Profile

