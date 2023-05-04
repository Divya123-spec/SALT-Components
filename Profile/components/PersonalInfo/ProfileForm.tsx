/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Checkbox, isRequired, TextInput } from '@exo/frontend-components-forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, DatePickerInput, Loading } from 'carbon-components-react';
import { useIsAuthenticated } from '@azure/msal-react';
import { FormBody } from '../../../../../../forms/src/layout/FormBody/FormBody.styles';
import { FormHeader } from '../../../../../../forms/src/layout/FormHeader/FormHeader.styles';
import * as S from './ProfileForm.styles';
import { TabsLayout } from '../../../../TabsLayout/TabsLayout';
import { GolferInformation } from '../GolferInformation/GolferInformation';
import { usePersonalDataSubmit, useProfileData } from '../../hooks/ProfileForm';
import { useGetGolferDetails } from '../../hooks/useGolferInfo';
import { useGetCourses } from '../../hooks/useCourses';
import { GolferInfoProvider } from '../../context/golferInfoContext';
import { GolferHistory } from '../GolferHistory/GolferHistory';
import { PurchaseHistory } from '../PurchaseHistory/PurchaseHistory';
import avtharImage from '../assets/avtharImage.jpg';
import { MyProfileHeader } from '../MyProfileHeader/MyProfileHeader';
import { ButtonUI, ButtonWrapper } from '../../../../index';
import { CountryOptions } from '../../../GolfPackage/components/CountryOptions/CountryOptions';
import { Loyalty } from '../Loyalty/Loyalty';

let schema = yup.object().shape({
  firstName: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, {  // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(50).required('Please enter your first name'),
  lastName: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, { // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(50).required('Please enter your last name'),
  displayName: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, { // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(50).required('Please enter your display name'),
  gender: yup.string().required('Please enter your gender'),
  userDob: yup.string(),
  address: yup.string().required('Please enter your address'),
  email: yup.string(),
  city: yup.string().required('Please enter your city')
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, { // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    }),
  country: yup.string().required('Please enter your country'),
  postalcode: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, { // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(15).required('Please enter your postal code'),

  careers: yup.boolean(),
  learn: yup.boolean(),
  news: yup.boolean(),
  play: yup.boolean(),
  relax: yup.boolean(),
  shop: yup.boolean(),
  unubscribeFromAll: yup.boolean(),
  myCustomFieldName: yup.boolean()
});

schema = schema.test(
  'myCustomCheckboxTest',
  'Please select at least one option',
  (obj) => {
    if (obj?.careers || obj?.learn || obj?.news || obj?.play || obj?.relax || obj?.shop || obj?.unubscribeFromAll) {
      return true;
    }

    return new yup.ValidationError(
      'Check at least one checkbox',
      null,
      'myCustomFieldName'
    );
  }
);




const golferInfoObject: any = {
  ibm_image: '',
  handicap: '',
  preferredCourse: '',
  leftorRightHanded: '',
  homeGolfClub: '',
  golferId: '',
  country: '',
  userDob: '',
  city: '',
  gender: '',
  firstName: '',
  lastName: '',
  address: '',
  emailID: '',
  displayName: '',
  postalcode: '',
  careers: false,
  learn: false,
  news: false,
  play: false,
  relax: false,
  shop: false,
  unubscribeFromAll: false
};

export const ProfileForm = () => {
  const pageTopRef = useRef<any>();

  const [sizeerrors, setsizeErrors] = useState('');
  const [filetErrors, sefiletErrors] = useState('');
  const [date, setDate] = useState<any>(null);
  const { ProfilePictureDetails } = useProfileData();
  const { SaveProfileDetails, profileLoading } = usePersonalDataSubmit();
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [dateErrorMsg, setDateErrorMsg]=useState('');
  const isAuthenticated = useIsAuthenticated();
  let resultImage = '';
  let finalImageData = '';
  let firstName = '';
  let lastName = '';
  let displayName = '';
  let city = '';
  let country = '';
  let gender = '';
  let email = '';
  const isEmail = true;
  const idPrefix = 'personal_details';  
  const sessionUserDetails = sessionStorage.getItem('userDetails') ? JSON.parse(sessionStorage.getItem('userDetails') as any) : '';
  const userDetails = sessionUserDetails ? sessionUserDetails.idTokenClaims : '';
  if (userDetails) {
    email = userDetails && userDetails.email ? userDetails.email : userDetails.emails[0];
    lastName = userDetails?.family_name;
    firstName = userDetails?.given_name;
    city = userDetails?.city;
    country = userDetails?.country;
    gender = userDetails?.extension_Gender;
    displayName = userDetails?.name;
  }
  let emailNew = '';
  if(isAuthenticated && sessionUserDetails){
    emailNew = (sessionUserDetails && sessionUserDetails.idTokenClaims) ? sessionUserDetails.idTokenClaims.email : sessionUserDetails.idTokenClaims.emails[0];
  }
  const emailID = emailNew || '';

  const { golferDetails, loading, error, refetch } = useGetGolferDetails(emailID);
  const { courseDetails } = useGetCourses();

  useEffect(() => {
    const receivedCourse = courseDetails?.filter(
      (item) => item?.id === golferDetails?.preferredcourse
    );
    const selectedCourse = receivedCourse?.[0] === undefined ? '' : receivedCourse?.[0]?.courseName;
    const leftOrRight = golferDetails?.leftrighthanded === null ? '' : golferDetails?.leftrighthanded ? 'Right Handed' : 'Left Handed'; // eslint-disable-line no-nested-ternary
    golferInfoObject.handicap = golferDetails?.handicap === null ? '' : golferDetails?.handicap;
    golferInfoObject.preferredCourse = selectedCourse;
    golferInfoObject.leftorRightHanded = leftOrRight;
    golferInfoObject.homeGolfClub = golferDetails?.homeclub === null ? '' : golferDetails?.homeclub;
    golferInfoObject.golferId = golferDetails?.golferId === null ? '' : golferDetails?.golferId;
    golferInfoObject.ibm_image = golferDetails?.ibm_image === null ? '' : golferDetails?.ibm_image;
    golferInfoObject.emailID = emailID;

    if(golferDetails && golferDetails?.displayName) {
      golferInfoObject.displayName = golferDetails?.displayName === null ? '' : golferDetails?.displayName;
      golferInfoObject.firstName = golferDetails?.firstname === null ? '' : golferDetails?.firstname;
      golferInfoObject.lastName = golferDetails?.lastname === null ? '' : golferDetails?.lastname;
      golferInfoObject.address = golferDetails?.address === null ? '' : golferDetails?.address;
      golferInfoObject.gender = golferDetails?.gender === null ? '' : golferDetails?.gender;
      golferInfoObject.userDob = golferDetails?.dob === null ? '' : golferDetails?.dob;
      golferInfoObject.city = golferDetails?.city === null ? '' : golferDetails?.city;
      golferInfoObject.postalcode = golferDetails?.postalcode === null ? '' : golferDetails?.postalcode;
      golferInfoObject.careers = golferInfoObject?.careers === null ? false : golferDetails?.careers;
      golferInfoObject.learn = golferInfoObject?.learn === null ? false : golferDetails?.learn;
      golferInfoObject.news = golferInfoObject?.news === null ? false : golferDetails?.news;
      golferInfoObject.play = golferInfoObject?.play === null ? false : golferDetails?.play;
      golferInfoObject.relax = golferInfoObject?.relax === null ? false : golferDetails?.relax;
      golferInfoObject.shop = golferInfoObject?.shop === null ? false : golferDetails?.shop;
      golferInfoObject.country = golferDetails?.country === null ? '' : golferDetails?.country;
    }
    else if (golferInfoObject && (golferInfoObject.displayName ||
      golferInfoObject.firstName ||
      golferInfoObject.lastName ||
      golferInfoObject.userDob ||
      golferInfoObject.address ||
      golferInfoObject.gender ||
      golferInfoObject.city ||
      golferInfoObject.postalcode ||
      golferInfoObject.careers ||
      golferInfoObject.learn ||
      golferInfoObject.news ||
      golferInfoObject.play ||
      golferInfoObject.relax ||
      golferInfoObject.shop ||
      golferInfoObject.unubscribeFromAll ||
      golferInfoObject.country)) {
      golferInfoObject.displayName;
      golferInfoObject.firstName;
      golferInfoObject.lastName;
      golferInfoObject.address;
      golferInfoObject.gender;
      golferInfoObject.userDob;
      golferInfoObject.city;
      golferInfoObject.postalcode;
      golferInfoObject.careers;
      golferInfoObject.learn;
      golferInfoObject.news;
      golferInfoObject.play;
      golferInfoObject.relax;
      golferInfoObject.shop;
      golferInfoObject.country;
      golferInfoObject.unubscribeFromAll;
    }
  }, [loading, golferDetails]);

  const formatAccToDatePicker = (crmDob) => {
    let datePickerFormattedDate = '';
    const dateWithSlash = crmDob ? crmDob.replaceAll('-', '/') : null;
    datePickerFormattedDate = moment(dateWithSlash, 'YYYY/MM/DD').format('DD/MM/YYYY');
    return datePickerFormattedDate;
  };

  resultImage = 'data:image/jpeg;base64,'.concat(golferInfoObject.ibm_image);
  if (typeof window !== 'undefined') {
    const storedImageData = JSON.parse(window.localStorage.getItem('imageData')!);
    finalImageData = storedImageData || resultImage;
  }

  const hiddenFileInput = React.useRef<any>(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const getImageBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64result = String(reader.result).split(',')[1];
      resultImage = 'data:image/jpeg;base64,'.concat(base64result);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('imageData', JSON.stringify(resultImage));
      }
      ProfilePictureDetails({
        variables: {
          email,
          displayName,
          firstName,
          lastName,
          country,
          city,
          gender,
          ibmImage: base64result

        },
        errorPolicy: 'all'
      });
    };
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const fileSize = 1024 * 1024;
    const re = /(\.jpg|\.jpeg|\.png|\.bmp|.\tiff)$/i;

    if (file.size > fileSize) {
      setsizeErrors(`${'Please upload a image less than 1 MB'}`);
      sefiletErrors('');
    } else if (!re.exec(file.name)) {
      // String str2 = "Hello"+ "\r\n" +"world";
      sefiletErrors(`${'Please upload a image in JPEG,JPG,PNG,BMP or TIF format only.'}`);

      setsizeErrors('');
    } else {
      sefiletErrors('');
      setsizeErrors('');
      getImageBase64(file);
    }
  };

  const [isEdit, setisEdit] = useState(false);
  const [isEdited, setisEdited] = useState(false);


  const handleEdit = () => {
    setisEdit(true);
  };

  const fetchAfterSave = () => {
    setisEdited(false);
    const timeOutInterval = 2000;
    const timeOutVar = setTimeout(() => {
      refetch({ email: golferInfoObject.emailID });
    }, timeOutInterval);
    return () => clearTimeout(timeOutVar);
  };


  useEffect(() => {
    if (!isEdit && isEdited) {
      fetchAfterSave();
    }
    return () => { };
  }, [isEdit]);


  const { register, handleSubmit, formState, control, reset, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      displayName: golferInfoObject.displayName,
      firstName: golferInfoObject.firstName,
      lastName: golferInfoObject.lastName,
      gender: golferInfoObject.gender,
      userDob: date,
      address: golferInfoObject.address,
      city: golferInfoObject.city,
      country: golferInfoObject.country,
      postalcode: golferInfoObject.postalcode,
      careers: golferInfoObject.careers,
      learn: golferInfoObject.learn,
      news: golferInfoObject.news,
      play: golferInfoObject.play,
      relax: golferInfoObject.relax,
      shop: golferInfoObject.shop,
      unubscribeFromAll: golferInfoObject.unubscribeFromAll,
      myCustomFieldName: '',

      email
    },
    resolver: yupResolver(schema)
  });
  useEffect(() => {
    // reset form with user data
    reset(golferInfoObject);
  }, [loading]);

  const onError = (err) => {
    throw new Error(err);
  };

  const formatOfDatePicker = (selectedDob) => {
    let formattedDate = '';
    const dateWithdash = selectedDob ? selectedDob.replaceAll('/', '-') : null;
    formattedDate = moment(dateWithdash, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return formattedDate;
  };


  const onSubmit = (formData) => {
    formData.userDob = formatOfDatePicker(date);// eslint-disable-line no-param-reassign
    setDateErrorMsg('');
    if(formData.userDob === null || formData.userDob === '' || formData.userDob === 'Invalid date'){
      setDateErrorMsg('Please enter date of birth');
    }else{
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    golferInfoObject.displayName = formData.displayName; // eslint-disable-line no-self-assign
    golferInfoObject.firstName = formData.firstName;
    golferInfoObject.lastName = formData.lastName;
    golferInfoObject.userDob = formData.userDob;
    golferInfoObject.address = formData.address;
    golferInfoObject.gender = formData.gender;
    golferInfoObject.city = formData.city;
    golferInfoObject.country = formData.country;
    golferInfoObject.postalcode = formData.postalcode;
    golferInfoObject.careers = formData.careers;
    golferInfoObject.learn = formData.learn;
    golferInfoObject.news = formData.news;
    golferInfoObject.play = formData.play;
    golferInfoObject.relax = formData.relax;
    golferInfoObject.shop = formData.shop;
    golferInfoObject.unubscribeFromAll =formData.unubscribeFromAll

    setisEdited(true);
    
    SaveProfileDetails({
      variables: {
        email,
        displayName: golferInfoObject.displayName,
        firstname: golferInfoObject.firstName,
        lastname: golferInfoObject.lastName,
        address: golferInfoObject.address,
        dob: golferInfoObject.userDob === 'Invalid date' ? null : golferInfoObject.userDob,
        gender: golferInfoObject.gender,
        city: golferInfoObject.city,
        country: golferInfoObject.country,
        postalcode: golferInfoObject.postalcode,
        careers: isUnsubscribed ? false : golferInfoObject.careers,
        learn: isUnsubscribed ? false : golferInfoObject.learn,
        news: isUnsubscribed ? false : golferInfoObject.news,
        play: isUnsubscribed ? false : golferInfoObject.play,
        relax: isUnsubscribed ? false : golferInfoObject.relax,
        shop: isUnsubscribed ? false : golferInfoObject.shop



      },
      errorPolicy: 'all'
    });
 
    setisEdit(false);
    }
  };


  const savedDate = golferInfoObject.userDob && golferInfoObject.userDob === 'Invalid date' ? null : ((golferInfoObject.userDob) ? formatAccToDatePicker(golferInfoObject.userDob) : null); // eslint-disable-line no-nested-ternary 
  useEffect(() => {
    setDate(savedDate);
  }, [savedDate]);



  const handleDate = (e) => {
    setDateErrorMsg('');
    if (e && e.target) {
      setDate(e.target.value);
      if(e.target.value === null || e.target.value === '' ) {
        setDateErrorMsg('Please enter date of birth');
      }
    }
  };
  const handleDisableUnsubscribe = (value) => {
    if (value === true && isUnsubscribed === true) {
      setIsUnsubscribed(false);
      setValue('unubscribeFromAll', false);
      // setFormData((prevData) => ({ ...prevData, unubscribeFromAll: false }));
    }
  };

  const handleUnsubscribeFromAll = (value) => {
    if (value === true) {
      setValue('play', false);
      setValue('learn', false);
      setValue('shop', false);
      setValue('relax', false);
      setValue('news', false);
      setValue('careers', false);
    }
    setIsUnsubscribed(value);
  };
  const endDate = '12-31-2022';
  const startDate = '01-01-1900';

  return (
    <div>
      {profileLoading && <Loading />}
      {loading && !golferInfoObject.firstName && <Loading />}
      {!loading &&
        (!isEdit ? (
          <S.ProfileWrapper>
            <S.MyProfile>My Home of Golf</S.MyProfile>
            <S.DetailsFieldRow widths={['30%', '70%']}>
              <S.imagewrapper>
                {finalImageData === 'data:image/jpeg;base64,' ? (
                  <img
                    title='Upload Image'
                    className={'Preview'}
                    src={avtharImage}
                    onClick={handleClick}
                  />
                ) : (
                  <img
                    className={'Preview'}
                    title='Upload Image'
                    src={finalImageData}
                    onClick={handleClick}
                  />
                )}
                <input
                  accept="image/*"
                  type="file"
                  ref={hiddenFileInput}
                  onChange={uploadImage}
                  style={{ display: 'none' }}
                />
                <S.errormessage>
                  {sizeerrors}
                  {filetErrors}
                </S.errormessage>
              </S.imagewrapper>
              <div>
                <MyProfileHeader title="Personal Info" handleEdit={handleEdit} />
                <S.PersonalContainer>
                  <S.DisplayNamedisplay>

                    <S.StyledDisplaylabel>Display Name</S.StyledDisplaylabel>
                    <S.StyledDisplayspan>{golferInfoObject.displayName}</S.StyledDisplayspan>

                  </S.DisplayNamedisplay>

                  <S.DetailsFieldRow widths={['50%', '50%']}>
                    <div>
                      <S.Styledlabel>First Name</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.firstName ? golferInfoObject.firstName : '---'}</S.Styledspan>
                    </div>
                    <div>
                      <S.Styledlabel>Last Name</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.lastName ? golferInfoObject.lastName : '---'}</S.Styledspan>
                    </div>
                  </S.DetailsFieldRow>


                  <S.DetailsFieldRow widths={['50%', '50%']}>
                    <div>
                      <S.Styledlabel>Email Address:</S.Styledlabel>
                      <S.Styledspan>{email}</S.Styledspan>
                    </div>
                    <div>
                      <S.Styledlabel>DOB</S.Styledlabel>
                      <S.Styledspan>{savedDate || '---'}</S.Styledspan>
                    </div>
                  </S.DetailsFieldRow>
                  <S.DetailsFieldRow>
                    <div>
                      <S.Styledlabel>Home Address</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.address ? golferInfoObject.address : '---'}</S.Styledspan>
                    </div>
                    <div>
                      <S.Styledlabel>Gender</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.gender ? golferInfoObject.gender : '---'}</S.Styledspan>
                    </div>
                  </S.DetailsFieldRow>
                  <S.DetailsFieldRow>
                    <div>
                      <S.Styledlabel>City</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.city ? golferInfoObject.city : '---'}</S.Styledspan>
                    </div>
                    <div>
                      <S.Styledlabel>Postal Code</S.Styledlabel>
                      <S.Styledspan>{golferInfoObject.postalcode ? golferInfoObject.postalcode : '---'}</S.Styledspan>
                    </div>
                  </S.DetailsFieldRow>
                  <div>
                    <S.StyledDisplaylabel>Country</S.StyledDisplaylabel>
                    <S.StyledDisplayspan>{golferInfoObject.country ? golferInfoObject.country : '---'}</S.StyledDisplayspan>
                  </div>
                </S.PersonalContainer>
              </div>
            </S.DetailsFieldRow>

            <S.StyledTabs ref={pageTopRef}>
              <GolferInfoProvider value={golferInfoObject}>
                <TabsLayout
                  key="MyProfileDetails"
                  variation="centered"
                  selected={0}
                  title=""
                  tabsData={[
                    {
                      id: 'myGolf',
                      label: 'My Golf',
                      children: (
                        <GolferInformation courseDetails={courseDetails} loading={loading}
                        />
                      )
                    },
                    {
                      id: 'golfHistory',
                      label: 'Golf History',
                      children: (
                        <GolferHistory
                          golferDetails={golferDetails}
                          loading={loading}
                          error={error}
                          courseDetails={courseDetails}
                          pageTopRef={pageTopRef}

                        />
                      )
                    },
                    {
                      id: 'purchasehistory',
                      label: 'Purchase History',
                      children: (
                        <PurchaseHistory
                          golferDetails={golferDetails}
                          loading={loading}
                          error={error}
                          pageTopRef={pageTopRef}
                        />
                      )
                    },
                    {
                      id: 'myLoyalty',
                      label: 'My Loyalty (Coming Soon)',
                      children: (<Loyalty></Loyalty>)
                    }
                  ]}
                />
              </GolferInfoProvider>
            </S.StyledTabs>
          </S.ProfileWrapper>
        ) : (
          <S.ProfileWrapper>
            <S.MyProfile>My Home of Golf</S.MyProfile>
            <S.DetailsFieldRow widths={['30%', '70%']}>
              <S.imagewrapper>
                {finalImageData === 'data:image/jpeg;base64,' ? (
                  <img
                    className={'Preview'}
                    title='Upload Image'
                    src={avtharImage}
                    onClick={handleClick}
                  />
                ) : (
                  <img
                    className={'Preview'}
                    title='Upload Image'
                    src={finalImageData}
                    onClick={handleClick}
                  />
                )}
                <input
                  accept="image/*"
                  type="file"
                  ref={hiddenFileInput}
                  onChange={uploadImage}
                  style={{ display: 'none' }}
                />
                <S.errormessage>
                  {sizeerrors}
                  {filetErrors}
                </S.errormessage>
              </S.imagewrapper>
              <S.MyDetailsForm
                onSubmit={(event) => handleSubmit(onSubmit)(event)}
                onError={onError}
                form={{ reset, handleSubmit, formState }}
              >
                <FormHeader>
                  <S.Heading>Personal Info</S.Heading>
                </FormHeader>
                <S.FormContainer>
                  <FormBody>
                    <S.DisplayName>
                      <div>
                        <S.Styledlabel>Display Name:</S.Styledlabel>
                        <S.DisplayTextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_displayName`}
                            {...register('displayName')}
                            control={control}
                            value={golferInfoObject.displayName}
                            errorText={formState.errors.displayName?.message}
                            placeholderText="Display Name"

                          />
                        </S.DisplayTextInputWrapper>
                      </div>
                    </S.DisplayName>
                    <S.DetailsFieldRow widths={['50%', '50%']}>
                      <div>
                        <S.Styledlabel>First Name:</S.Styledlabel>
                        <S.TextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_firstName`}
                            {...register('firstName')}
                            control={control}
                            errorText={formState.errors.firstName?.message}
                            value={golferInfoObject.firstName}
                            placeholderText="Enter First Name"
                          />
                        </S.TextInputWrapper>
                      </div>
                      <div>
                        <S.Styledlabel>Last Name:</S.Styledlabel>
                        <S.TextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_lastName`}
                            placeholderText="Enter Last Name"
                            control={control}
                            errorText={formState.errors.lastName?.message}
                            {...register('lastName')}
                            value={golferInfoObject.lastName}
                          />
                        </S.TextInputWrapper>
                      </div>
                    </S.DetailsFieldRow>

                    <S.DetailsFieldRow widths={['50%', '50%']}>
                      <div>
                        <S.Styledlabel>Email Address:</S.Styledlabel>
                        <S.DisplayTextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_email`}
                            type="email"
                            isDisabled={isEmail}
                            placeholderText="Enter Email Address"
                            control={control}
                            {...register('email')}
                            value={email}
                          />
                        </S.DisplayTextInputWrapper>
                      </div>
                      <div>
                        <S.Styledlabel>Date of Birth:</S.Styledlabel>
                        <S.DateInputWrapper>
                          <DatePicker
                            datePickerType="single"
                            id={`${idPrefix}_userDob`}
                            {...register('userDob')}
                            minDate={startDate}
                            maxDate={endDate}
                            onBlur={(e) => handleDate(e)}
                            dateFormat="d/m/Y"
                          >
                            <DatePickerInput id="sample"
                              labelText=""
                              value={date!} // eslint-disable-line no-nested-ternary 
                              placeholder="Enter Date of Birth"
                            />
                          </DatePicker>
                        </S.DateInputWrapper>
                        {<S.ErrorTextStyle>{dateErrorMsg}</S.ErrorTextStyle>}
                      </div>
                    </S.DetailsFieldRow>

                    <S.DetailsFieldRow widths={['50%', '50%']}>
                      <div>
                        <S.Styledlabel>Home Address:</S.Styledlabel>
                        <S.TextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_address`}
                            placeholderText="Enter Home Address"
                            control={control}
                            {...register('address')}
                            errorText={formState.errors.address?.message}
                            value={golferInfoObject.address}
                          />
                        </S.TextInputWrapper>
                      </div>
                      <S.DropdownWrapper>
                        <S.Styledlabel>Gender:</S.Styledlabel>
                        <S.TextInputWrapper>
                          <S.StyledDropdown
                            id={`${idPrefix}_gender`}
                            placeholderText="Choose an option"
                            isRequired={'Not Required'}
                            errorText={formState.errors.gender?.message}
                            control={control}
                            {...register('gender')}
                            value={golferInfoObject.gender}
                            items={[
                              { value: 'Male', name: 'Male' },
                              { value: 'Female', name: 'Female' },
                              { value: 'Other', name: 'Other' },
                              { value: 'Prefer not to answer', name: 'Perfer to not answer' }
                            ]}
                          />
                        </S.TextInputWrapper>
                      </S.DropdownWrapper>

                    </S.DetailsFieldRow>

                    <S.DetailsFieldRow widths={['50%', '50%']}>
                      <div>
                        <S.Styledlabel>City:</S.Styledlabel>
                        <S.TextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_city`}
                            placeholderText="Enter Your City"
                            control={control}
                            {...register('city')}
                            value={golferInfoObject.city}
                            errorText={formState.errors.city?.message}
                          />
                        </S.TextInputWrapper>
                      </div>
                      <div>
                        <S.Styledlabel>Postal Code</S.Styledlabel>
                        <S.TextInputWrapper>
                          <TextInput
                            id={`${idPrefix}_postalcode`}
                            {...register('postalcode')}
                            control={control}
                            value={golferInfoObject.postalcode}
                            errorText={formState.errors.postalcode?.message}
                            placeholderText="Postal Code"
                          />
                        </S.TextInputWrapper>
                      </div>
                    </S.DetailsFieldRow>
                    <div>
                      <S.DropdownWrapper>
                        <S.Styledlabel>Country of residence</S.Styledlabel>
                        <S.DisplayTextInputWrapper>
                          <CountryOptions
                            id={`${idPrefix}_country`}
                            {...register('country')}
                            control={control}
                            isRequired={isRequired(schema, `${idPrefix}_country`, true) ?? true}
                            value={golferInfoObject.country}
                            errorText={formState.errors.country?.message}
                            labelText=""
                            placeholderText="Select your country"
                          />
                        </S.DisplayTextInputWrapper>
                      </S.DropdownWrapper>
                    </div>

                    <S.StyleCheck>
                      <S.StyledDisplaycheckbox>Marketing Preferences (Please select the emails you would like to receive from us)</S.StyledDisplaycheckbox>
                      <Checkbox
                        id={`${idPrefix}_play`}
                        {...register('play')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.play}
                        errorText={formState.errors.myCustomFieldName?.message}
                        labelText="Tee times and golf packages"
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />
                      <Checkbox
                        id={`${idPrefix}_learn`}
                        {...register('learn')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.learn}
                        errorText={formState.errors.myCustomFieldName?.message}
                        labelText="Academy news and updates"
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />
                      <Checkbox
                        id={`${idPrefix}_shop`}
                        {...register('shop')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.shop}
                        labelText="Official merchandise and shopping updates"
                        errorText={formState.errors.myCustomFieldName?.message}
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />

                      <Checkbox
                        id={`${idPrefix}_relax`}
                        {...register('relax')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.relax}
                        labelText="Clubhouses, events and dining news and updates"
                        errorText={formState.errors.myCustomFieldName?.message}
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />

                      <Checkbox
                        id={`${idPrefix}_news`}
                        {...register('news')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.news}
                        labelText="Latest news and updates"
                        errorText={formState.errors.myCustomFieldName?.message}
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />

                      <Checkbox
                        id={`${idPrefix}_careers`}
                        {...register('careers')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.careers}
                        labelText="Careers updates"
                        errorText={formState.errors.myCustomFieldName?.message}
                        onChange={(e) => {
                          handleDisableUnsubscribe(e.target.checked);
                        }}
                      />

                      <S.CheckboxGroupDescription>or</S.CheckboxGroupDescription>

                      <Checkbox
                        id={`${idPrefix}_unubscribeFromAll`}
                        {...register('unubscribeFromAll')}
                        control={control}
                        isRequired={false}
                        value={golferInfoObject?.unubscribeFromAll}
                        errorText={formState.errors.myCustomFieldName?.message}
                        onChange={(e) => handleUnsubscribeFromAll(e.target.checked)}
                        labelText="Unsubscribe from all marketing emails"
                      />

                    </S.StyleCheck>

                  </FormBody>

                  <S.DetailsFormFooter>
                    <ButtonWrapper variation="space-between">
                      <S.StyledButton>
                        {true && (
                          <ButtonUI
                            variant="tertiary"
                            type="submit"
                            label="Save"
                            icon="ArrowRight32"
                            
                          />
                        )}
                      </S.StyledButton>
                    </ButtonWrapper>
                  </S.DetailsFormFooter>
                </S.FormContainer>
              </S.MyDetailsForm>
            </S.DetailsFieldRow>

            <S.StyledTabs ref={pageTopRef}>
              <GolferInfoProvider value={golferInfoObject}>
                <TabsLayout
                  key="MyProfileDetails"
                  variation="centered"
                  selected={0}
                  title=""
                  tabsData={[
                    {
                      id: 'myGolf',
                      label: 'My Golf',
                      children: (
                        <GolferInformation courseDetails={courseDetails} loading={loading}
                        />
                      )
                    },
                    {
                      id: 'golfHistory',
                      label: 'Golf History',
                      children: (
                        <GolferHistory
                          golferDetails={golferDetails}
                          loading={loading}
                          error={error}
                          courseDetails={courseDetails}
                          pageTopRef={pageTopRef}
                        />
                      )
                    },
                    {
                      id: 'purchasehistory',
                      label: 'Purchase History',
                      children: (
                        <PurchaseHistory
                          golferDetails={golferDetails}
                          loading={loading}
                          error={error}
                          pageTopRef={pageTopRef}
                        />
                      )
                    },
                    {
                      id: 'myLoyalty',
                      label: 'My Loyalty (Coming Soon)',
                      children: (<Loyalty></Loyalty>)
                    }
                  ]}
                />
              </GolferInfoProvider>
            </S.StyledTabs>
          </S.ProfileWrapper>
        ))}
    </div>
  );
};
export type Courses = {
  id: string;
  courseName: string;
};

