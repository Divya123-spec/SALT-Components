/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormHeader,
  FormBody, Field,
  isRequired, TextInput, PhoneInput
} from '@exo/frontend-components-forms';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Loading, 
  Dropdown, 
  FileUploader, 
  ModalFooter, 
  Button, 
  ComposedModal, 
  ModalHeader, 
  ModalBody, 
  FormItem, 
  DatePicker, 
  DatePickerInput,
  Tooltip
} from 'carbon-components-react';
import { useIsAuthenticated } from '@azure/msal-react';
import { useHistory, Link } from 'react-router-dom';
import countryTelData from 'country-telephone-data';
import moment from 'moment';
import { getURL } from '@exo/frontend-common-utils';
import { useMediaQuery } from 'react-responsive';
import { useGetTournamentDetails } from '../hooks/useGetTournamentDetails';
import * as S from './TournamentDetailsPage.styles';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { useCountryCodes } from '../hooks/useCountryCodes';
import { useCDHCertificateUpdate, useTournamentDataSubmit } from '../hooks/useTournamentDetailsSubmit';
import { Checkbox } from '../Checkbox/Checkbox';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

const schema = yup
  .object()
  .shape({
    my_firstName: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, {  // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(50).required('Please enter your first name'),
    my_lastName: yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, { // eslint-disable-line no-useless-escape
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .max(50).required('Please enter your last name'),
    my_email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter a valid email address'),
    my_phoneNumber: yup
      .string()
      .matches(/^(\+|00)[0-9][0-9 \-().]{4,32}$/, 'Please enter a valid format')
      .max(15, 'Phone number must be at most 15 Numbers')
      .required('Please enter your phone number'),
    my_country: yup.string().required('Please select your country'),
    homeOfGolf: yup.string().required('Please enter home of golf'),
    cdhNumber: yup.string(),
    termsAndConditions: yup.boolean().required(),
    chkHandicapIndex:yup.boolean().optional(),
    wagrranking: yup.string().optional(),
    myfile:yup.mixed().nullable().required('Please upload file'),
    handicapIndex: yup.string()
  })
  .required();  
  const playerDetails: any = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    country: '',
    address: '',
    cdhNumber: '',
    handicapIndex: '',
    homeOfGolf: '',
    wagrranking: '',
    chkHandicapIndex: false
  };
  const detailsForAuthUser = {
    firstName: '',
    lastName: '',
    email: '',
    country: ''
  };
const TournamentDetailsPage = () => {
    const history = useHistory();
    const isAuthenticated = useIsAuthenticated();
    const { submitTournamentDetails, tournamentSubmittedValues, loadingSubmitResult } = useTournamentDataSubmit();
    const { tournamentDetails, loading } = useGetTournamentDetails();  
    const { updateCDHCertificate, cdhUploadData, loadingCdhUploadResult } = useCDHCertificateUpdate(); 
    const [date, setDate] = useState<any>(null);
    const [show, setShow] = useState(false);
    const { dataCountryCodes } = useCountryCodes();
    const [open, setOpen] = useState(false);
    const [validate, setValidate] = useState(false);
    const [countryCode, setCountryCode] = useState(0);
    const [validateCountry, setValidateCountry] = useState(false);
    const [countrySelectionErrorMsg, setCountrySelectionErrorMsg]=useState(false);
    const [fileSizeLimitError, setFileSizeLimitError] = useState('');
    const [fileTypeError, setFileTypeError] = useState('');
    const [dateErrorMsg, setDateErrorMsg]=useState('');
    const [validateHandicap, setValidateHandicap] = useState(false);
    const [plusHandicapIndexCheckStatus, setPlusHandicapIndexCheckStatus] = useState(false);
    const [handicapErrorMsg, setHandicapErrorMsg]=useState('');
    const [cdhErrorMsg, setCdhErrorMsg]=useState('');
    const [fileUploadSuccessMessage, setFileUploadSuccessMessage] = useState('');
    const [fileUploadError, setFileUploadError]=useState(false);
    const [fileUploadPath, setFileUploadPath]=useState('');
    const [ccOptions, setCcOptions] = useState<Array<{ value: any; name: any }>>([
      { value: 'Loading...', name: 'Loading...' }
    ]);
    const isMobile = useMediaQuery({ query: '(max-width:1023px)' });
    const idPrefix = 'my';
    let tournamentName = '';
    let competitionName = '';
    const tournamentInfoObject: any = {
      competitionId: '',
      startDate: '',
      endDate: '',
      entryCost: '',
      dateOfBirthRequired: '',
      cutoffdate: '',
      cutoffdateYear: '',
      maximumHandicap: 0,
      minimumHandicap: 0,
      dateofbirthadditionalinfo: '',
      handicapadditionaltext: ''
    };
    if (typeof window !== 'undefined') {
      competitionName = window.sessionStorage.tournamentName;
    }
    useEffect(() => {
      const mapped = dataCountryCodes?.map((item) => ({ value: item, name: item.name }));
      if (mapped && mapped?.length > 0) setCcOptions(mapped);
    }, [dataCountryCodes]);
    useEffect(() => {
      const timer = setTimeout(() => setShow(true), 2 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }, [tournamentDetails, show]);

    useEffect(() => {
      if(tournamentSubmittedValues){
        if(competitionName === 'eden-tournament' || competitionName === 'strathtyrum-tournament'){
          let redirectSubmittedPage = '';
          if(competitionName === 'eden-tournament'){
            redirectSubmittedPage = 'eden_tournament_request_submitted';
          }
          else if(competitionName === 'strathtyrum-tournament') {
            redirectSubmittedPage = 'strath_tournament_request_submitted';
          }
            history.push({
              pathname: getURL(redirectSubmittedPage) 
            });
        }
        else if(tournamentInfoObject?.entryCost && tournamentSubmittedValues?.createTournamentEntrantDetails){
            history.push({
              pathname: '/payment',
              state: { 
                amount: tournamentInfoObject?.entryCost, 
                id: tournamentSubmittedValues?.createTournamentEntrantDetails,
                tournamentName: tournamentInfoObject?.competitionName,
                phoneNumber: playerDetails.phoneNumber
              }            
            });
          }
      }
    }, [tournamentSubmittedValues, !loadingSubmitResult]);
    useEffect(() => {
      if(cdhUploadData){
        setFileUploadPath(cdhUploadData?.cdhCertificateUpload);
      }
    }, [cdhUploadData, !loadingCdhUploadResult]);
   
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const objCountry = new Array();
    Object.entries(countryTelData.iso2Lookup).forEach((obj) =>
      objCountry.push({
        value: `+${obj[1]}`,
        name: `+${obj[1]}`
      })
    );  
    if(isAuthenticated) {
      if (typeof window !== 'undefined' && window.sessionStorage.userDetails) {
        const result = JSON.parse(window.sessionStorage.userDetails);
        const userValues = result.idTokenClaims;
        let emailID = ''; 
        if(result && userValues){
          emailID = userValues && userValues.email ? userValues.email: userValues.emails[0];
        }
        // eslint-disable-next-line
        const { userDetails, loading } = useGetUserDetails(emailID)!;
        if(userDetails && !loading) {
          window.sessionStorage.setItem('profileData', JSON.stringify(userDetails));
      }
    }
  }
    const handleCountryChange = (e) => {
      const selectedCountry = e.selectedItem.value.name;
      if(selectedCountry !== '') {
        setValidateCountry(true);
        const cCode = e.selectedItem.value.code;
        if(cCode) setCountryCode(cCode);
      }
      else {
        setValidateCountry(false);
        setCountrySelectionErrorMsg(true);
      }
    };
    const formatTournamentAdminDateField = (dateValue) => {
      const datePickerFormattedDate = moment(dateValue).format('DD-MMMM-YYYY').replaceAll('-', ' ');
      return datePickerFormattedDate;
    };

    const formatTournamentAdminWithoutYear = (dateValue) => {
      const datePickerFormattedDate = moment(dateValue).format('DD-MMMM').replaceAll('-', ' ');
      return datePickerFormattedDate;
    };
    const formatOfDatePicker = (selectedDob) => {
      let formattedDate = '';
      const dateWithdash = selectedDob ? selectedDob.replaceAll('/', '-') : null;
      formattedDate = moment(dateWithdash, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return formattedDate;
    };
    if(tournamentDetails){
      tournamentDetails.map((tournament) => {
        const tName = tournament.competitionName;
        const updatedName = tName?.replace('St Andrews ', '').replace('’', '').trim().replaceAll(' ', '-').toLowerCase();
        if(updatedName === competitionName){
          if(tournament.competitionId){
            tournamentInfoObject.competitionId = tournament.competitionId;
          }
          if(tournament.startDate){
            const sDate = new Date(Number(tournament.startDate)); 
            tournamentInfoObject.startDate = sDate.toLocaleDateString('en-US');
            tournamentInfoObject.startDate = formatTournamentAdminWithoutYear(tournamentInfoObject.startDate); 
            const startDateName = new Date(Number(tournament.startDate)).toLocaleDateString('en-gb', { weekday:'long' });
            tournamentInfoObject.startDate= `${startDateName} ${tournamentInfoObject.startDate}`;
          }
          if(tournament.endDate){
            const eDate = new Date(Number(tournament.endDate)); 
            tournamentInfoObject.endDate = eDate.toLocaleDateString('en-US');
            tournamentInfoObject.endDate = formatTournamentAdminWithoutYear(tournamentInfoObject.endDate); 
            const endDateName = new Date(Number(tournament.endDate)).toLocaleDateString('en-gb', { weekday:'long' });
            tournamentInfoObject.endDate= `${endDateName} ${tournamentInfoObject.endDate}`;
          }
          if(tournament.competitionName){
            tournamentInfoObject.competitionName = tournament.competitionName;
          }
          if(tournament.entryCost){
            tournamentInfoObject.entryCost = tournament.entryCost;
          }
          if(tournament.registrationCloseDate){
            const cDate=new Date(Number(tournament.registrationCloseDate));
            tournamentInfoObject.registrationCloseDate=formatTournamentAdminDateField(cDate.toLocaleDateString('en-US'));
            const closeDateName = new Date(Number(tournament.registrationCloseDate)).toLocaleDateString('en-gb', { weekday:'long' });
            tournamentInfoObject.registrationCloseDate= `${closeDateName} ${tournamentInfoObject.registrationCloseDate}`;
          }
          if(tournament.cutoffdate){          
            const cDate=new Date(Number(tournament.cutoffdate));
            tournamentInfoObject.cutoffdateYear = (new Date(cDate)).getFullYear();
            const formattedDate = moment(cDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
            tournamentInfoObject.cutoffdate = formattedDate;
          }
          if(tournament.dateOfBirthRequired){
            tournamentInfoObject.dateOfBirthRequired = tournament.dateOfBirthRequired;
          }
          if(tournament.maximumHandicap){
            tournamentInfoObject.maximumHandicap = Number(tournament.maximumHandicap);
          }
          if(tournament.minimumHandicap){
            tournamentInfoObject.minimumHandicap = Number(tournament.minimumHandicap);
          }
          if(tournament.dateofbirthadditionalinfo){
            tournamentInfoObject.dateofbirthadditionalinfo = tournament.dateofbirthadditionalinfo;
          }
          if(tournament.handicapadditionaltext){
            tournamentInfoObject.handicapadditionaltext = tournament.handicapadditionaltext;
          }          
        }
        return tournamentInfoObject;
      });
    }
    const getYearsDiff =(d1, d2) => {
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      const yearsDiff =  date2.getFullYear() - date1.getFullYear();
      return yearsDiff;
    };
    useEffect(() => {
      if(typeof window !== 'undefined'){
        window.sessionStorage.removeItem('tournamentRedirect');
      }
    }, [!loading, tournamentDetails]);
    if(isAuthenticated) {
      if (typeof window !== 'undefined' && window.sessionStorage.userDetails) {
        const resultFromSession = JSON.parse(window.sessionStorage.userDetails);
        const userValuesFromSession = resultFromSession.idTokenClaims;
        let emailIDFromSession = '';
        if(resultFromSession && userValuesFromSession){
          emailIDFromSession = userValuesFromSession && userValuesFromSession.email ? userValuesFromSession.email : userValuesFromSession.emails[0];
        }
        if(window.sessionStorage.profileData){
          const userInfo = window.sessionStorage.profileData ? JSON.parse(window.sessionStorage.profileData) : '';
          if(userInfo || emailIDFromSession) {
            detailsForAuthUser.firstName =  userInfo.firstname ? userInfo.firstname : '';
            detailsForAuthUser.lastName =  userInfo.lastname ? userInfo.lastname : '';
            detailsForAuthUser.email =  (userInfo.email === null || userInfo.email === undefined) ? emailIDFromSession : userInfo.email;
            detailsForAuthUser.country =  userInfo.country ? userInfo.country : '';
          }
        }
      }
  }
    const { register, handleSubmit, formState, control, reset, watch, setError } = useForm(
        {
          mode: 'all',
          defaultValues: {
            my_firstName: detailsForAuthUser.firstName,
            my_lastName: detailsForAuthUser.lastName,
            my_email: detailsForAuthUser.email,
            my_phoneNumber: '1',
            my_country: '1',
            my_userDob: '',
            handicapIndex: '',
            wagrranking: '',
            homeOfGolf: '',
            cdhNumber: '',
            termsAndConditions: false,
            chkHandicapIndex: false,
            myfile:''
          },
          resolver: yupResolver(schema)
        }
      );  
    
    const { isValid } = formState;  
    const canSubmit= watch('termsAndConditions') && isValid && validate && validateHandicap && validateCountry;
    if(competitionName === 'links-trophy'){
        const one =  document.getElementById('container-one');
        const two =  document.getElementById('container-two');
        if(one) {
          if(isMobile){
            one.style.width='100%';
            one.style.paddingRight = '0px';
               }
          else{
            one.style.width = '50%';
            one.style.paddingRight = '25px';
          }
          }
        if(two) {
          if(isMobile){
            two.style.display = 'block';
            two.style.width = '100%';   
            }
            else{
              two.style.display = 'block';
              two.style.width = '50%';
        }}
    }
    if(typeof window !== 'undefined'){
      const currYear = tournamentInfoObject.cutoffdateYear ? tournamentInfoObject.cutoffdateYear : ''; 
      switch(competitionName) {
        case 'links-trophy':
          tournamentName = `St Andrews Links Trophy ${currYear}`;
          break;
        case 'boys-open':
          tournamentName = `St Andrews Boys' Open ${currYear}`;
         break;
        case 'junior-ladies-open':
          tournamentName = `St Andrews Junior Ladies' Open ${currYear}`;
          break;
        case 'st-rule-trophy':
          tournamentName = `St Rule Trophy ${currYear}`;
          break;
        case 'strathtyrum-tournament':
          tournamentName = `Strathtyrum Tournament ${currYear}`;
          break;
        case 'eden-tournament':
          tournamentName = `Eden Tournament ${currYear}`;
          break;
        default:
            break;
      }
    }
    const onError = (err) => {
      throw new Error(err);
    };

    useEffect(() => {
      if(!isAuthenticated) {
        setOpen(true);
      }
    }, []);  
    const handleModalCancel = () => {
      setOpen(false);
      history.goBack();
    };
    const handleModalOk = () => {
      if(typeof window !== 'undefined'){
        window.sessionStorage.setItem('tournamentRedirect', 'redirectToTournamentForm');
      }
      history.push({ pathname: '/login' });
    };
    const handleFileDelete = (e) => {
      e.preventDefault();
      setFileUploadPath('');
      setFileTypeError('');
      setFileSizeLimitError('');
      setFileUploadSuccessMessage('');
      const elementErrorOnDelete =  document.getElementById('file-error-msg');  
      const elementSuccessOnDelete =  document.getElementById('file-success-msg');  
      if(elementSuccessOnDelete) elementSuccessOnDelete.style.display = 'none';
      if(elementErrorOnDelete) elementErrorOnDelete.style.display = 'none'; 
    };
    const handleFileUpload = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      const fileSize = 1024 * 1024;
      const re = /(\.doc|\.docx|\.pdf)$/i;
      const elementErrorOnUpload =  document.getElementById('file-error-msg');  
      const elementSuccessOnUpload =  document.getElementById('file-success-msg');       
      setFileUploadError(false); 
      if(!file.size){
        setFileUploadError(true);
      }
      if (file.size > fileSize) {
        if(elementSuccessOnUpload) elementSuccessOnUpload.style.display = 'none';
        if(elementErrorOnUpload) elementErrorOnUpload.style.display = 'block';
        setFileSizeLimitError(`${'Please upload a file less than 1mb'}`);
        setFileTypeError('');
      } else if (!re.exec(file.name)) {
        if(elementSuccessOnUpload) elementSuccessOnUpload.style.display = 'none';
        if(elementErrorOnUpload) elementErrorOnUpload.style.display = 'block';
        setFileTypeError(`${'Please upload a file in doc, docx or pdf format only.'}`);
        setFileSizeLimitError('');
      } else {
        if(elementErrorOnUpload) elementErrorOnUpload.style.display = 'none';
        if(elementSuccessOnUpload) elementSuccessOnUpload.style.display = 'block';
        setFileUploadSuccessMessage('File has uploaded successfully.');
        setFileTypeError('');
        setFileSizeLimitError(''); 
        updateCDHCertificate({
          variables: { 
            file 
          },
          errorPolicy: 'all'
        });
      }
    };    
    const handleDate = (e) => {
      let dateValue = null;
      if(e && e.target){    
        dateValue = e.target.value;   
        setDate(e.target.value);
        if(e.target.value !== '') {
          const fixedDate = tournamentInfoObject.cutoffdate;
          const formatDate = formatTournamentAdminDateField(fixedDate);
          if(competitionName === 'boys-open') {
            const selectedDate = moment(dateValue, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const dateDiff = getYearsDiff(selectedDate, fixedDate);
            if(dateDiff > 18){
              setValidate(false);
              setDateErrorMsg(`Entrants must be under 18 years of age as at ${formatDate}.`);
            }
            else{
              setValidate(true);
              setDateErrorMsg('');
            }
          }
          else if(competitionName === 'junior-ladies-open') {
            const selectedDate = moment(dateValue, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const dateDiff = getYearsDiff(selectedDate, fixedDate);
            if(dateDiff > 23){
              setValidate(false);
              setDateErrorMsg(`Entrants must be under 23 years of age as at ${formatDate}.`);
            }
            else{
              setValidate(true);
              setDateErrorMsg('');
            }
          }
          else{
            setValidate(true);
            setDateErrorMsg('');
          }
        }
        else {
          setValidate(false);
          setDateErrorMsg('Please enter date of birth');
        }
      }
    };   
    const handlePhoneNumber=(e)=>{ 
      if(e.target.value){
        setError('my_phoneNumber', { type:'custom', message:'Please Enter Phone Number' });
      }
    };
    const onSubmit = (formData) => {
        let handicapIndexValue = '';
        const checkMinusValue = formData?.handicapIndex?.includes('-');
        if(formData.chkHandicapIndex && !checkMinusValue){
          handicapIndexValue = `+${formData.handicapIndex}`;
        }
        else {
          handicapIndexValue = formData.handicapIndex;
        }
        const wagrrankingValue = formData.wagrranking ? parseInt(formData.wagrranking, 10) : 0;
        playerDetails.email = formData.my_email;  // eslint-disable-line no-self-assign
        playerDetails.firstName = (formData.my_firstName).trim(); // eslint-disable-line no-self-assign
        playerDetails.lastName = (formData.my_lastName).trim();
        playerDetails.phoneNumber = formData.my_phoneNumber;
        playerDetails.userDob = formatOfDatePicker(date);
        playerDetails.cdhNumber = formData.cdhNumber;
        playerDetails.homeOfGolf = formData.homeOfGolf;
        playerDetails.chkHandicapIndex = formData.chkHandicapIndex;
        submitTournamentDetails({
          variables: {
            competitionid: tournamentInfoObject.competitionId,
            firstname: playerDetails.firstName,
            lastname: playerDetails.lastName,
            email: playerDetails.email,           
            dateofbirth: playerDetails.userDob,
            phonenumber: playerDetails.phoneNumber, 
            countrycode: countryCode,
            cdhnumber: playerDetails.cdhNumber,
            handicap: handicapIndexValue,
            homeclub: playerDetails.homeOfGolf,
            wagrranking: wagrrankingValue,
            status: 'Initial Entered',
            plushandicapindex: playerDetails.chkHandicapIndex,
            fileUploadPath,
            country: countryCode,
            mobilePhone: playerDetails.phoneNumber,
            addressTypeCode: 10000 // This is the address type code i.e CMS/web in CRM.
          },
          errorPolicy: 'all'
        });
    };
    const endDate = '31-12-2022';
    const startDate = '01-01-1900';
    return (
    <div>
          {loadingSubmitResult && <Loading />}
          {loading && !tournamentInfoObject.competitionId && <Loading />}
          {(!loading) && isAuthenticated &&
          ( <div>
            <S.TournamentInfoContainer>
              <S.TournamentNameLabel>{tournamentName}</S.TournamentNameLabel>
              <S.TournamentInfo>Please complete the form below to enter the Tournament</S.TournamentInfo>
            </S.TournamentInfoContainer> 
            <S.TournamentDetailsLabel>Tournament Details</S.TournamentDetailsLabel>
            <S.TournamentDetailsContainer >
                <S.DetailsFieldRow widths={['50%', '50%']}>
                    <div>
                        <S.Styledlabel>Tournament Name:</S.Styledlabel>
                        <S.Styledspan>{tournamentInfoObject.competitionName}</S.Styledspan>
                    </div>
                    <div>
                        <S.Styledlabel>Price:</S.Styledlabel>
                        <S.Styledspan>&#163; {tournamentInfoObject.entryCost}</S.Styledspan>
                    </div>
                </S.DetailsFieldRow>
                <S.DetailsFieldRow widths={['50%', '50%']}>
                    <div>
                        <S.Styledlabel>Closing Date:</S.Styledlabel>
                        <S.Styledspan>{`${tournamentInfoObject.registrationCloseDate}`}</S.Styledspan>
                    </div>
                    <div>
                        <S.Styledlabel>Tournament Date:</S.Styledlabel>
                        <S.Styledspan>{`${tournamentInfoObject.startDate} to ${tournamentInfoObject.endDate}`}</S.Styledspan>
                    </div>
                </S.DetailsFieldRow>
        </S.TournamentDetailsContainer>
        <S.MyDetailsForm
            onSubmit={(event) => handleSubmit(onSubmit)(event)}
            onError={onError}
            form={{ reset, handleSubmit, formState }}
        >   
          <FormHeader>
            <S.PlayerDetailsLabel>Player Details</S.PlayerDetailsLabel>
          </FormHeader>
          <S.PlayerDetailsContainer>
            <FormBody>
                <S.DetailsFieldRow widths={['50%', '50%']}>
                    <TextInput
                      id={`${idPrefix}_firstName`}
                      {...register(`${idPrefix}_firstName`)}
                      control={control}
                      errorText={formState.errors[`${idPrefix}_firstName`]?.message}
                      isRequired={isRequired(true ? schema : undefined, `${idPrefix}_firstName`, true)}
                      labelText="First name"
                      placeholderText="Enter First Name"
                      autocomplete='off'
                    />
                    <TextInput
                      id={`${idPrefix}_lastName`}
                      {...register(`${idPrefix}_lastName`)}
                      control={control}
                      isRequired={isRequired(true ? schema : undefined, `${idPrefix}_lastName`, true)}
                      errorText={formState.errors[`${idPrefix}_lastName`]?.message}
                      labelText="Last Name"
                      placeholderText="Enter Last Name"
                      autocomplete='off'
                    />
                </S.DetailsFieldRow>
                <S.DetailsFieldRow widths={['50%', '50%']}>
                    <TextInput
                      id={`${idPrefix}_email`}
                      {...register(`${idPrefix}_email`)}
                      type="email"
                      control={control}
                      isRequired={isRequired(true ? schema : undefined, `${idPrefix}_email`, true)}
                      helpText={
                        'Please enter the email address used to set up your Scottish Golf App'
                      }
                      errorText={formState.errors[`${idPrefix}_email`]?.message}
                      labelText="Email address"
                      placeholderText="Your email address"
                      autocomplete='off'
                    />
                      <S.DateInputWrapper>
                        <S.StyledlabelForDob>
                          Date of Birth
                          <Tooltip>
                            {tournamentInfoObject.dateofbirthadditionalinfo}
                          </Tooltip>
                        </S.StyledlabelForDob>
                        <div>
                          <DatePicker
                            datePickerType="single"
                            id={`${idPrefix}_userDob`}
                            {...register('my_userDob')}
                            minDate={startDate}
                            maxDate={endDate}
                            onBlur={(e) =>handleDate(e)}
                            dateFormat="d/m/Y"
                          >
                            <DatePickerInput id="sample"
                              labelText=""
                              value={date!}
                              placeholder="Enter Date of Birth"
                              autoComplete='off'
                               />
                          </DatePicker>
                          {<S.ErrorTextStyle>{dateErrorMsg}</S.ErrorTextStyle>}
                        </div>
                        </S.DateInputWrapper>
                  </S.DetailsFieldRow>
                    <Field>
                      <PhoneInput
                        id={`${idPrefix}_phoneNumber`}
                        {...register(`${idPrefix}_phoneNumber`)}
                        control={control}
                        errorText={formState.errors[`${idPrefix}_phoneNumber`]?.message}
                        isRequired={isRequired(schema, `${idPrefix}_phoneNumber`, true)}
                        prefixes={objCountry}
                        labelText="Phone number"
                        placeholderText="Enter your phone number"
                        onChange={handlePhoneNumber}
                        autocomplete='off'
                      />
                    </Field>                      
                      <Field>
                      <Dropdown
                        id={`${idPrefix}_country`}
                        {...register(`${idPrefix}_country`)}
                        items={ccOptions.length > 0 ? ccOptions: [{ value: 'Loading...', name: 'Loading...' }]}
                        itemToString={item => item.name }
                        onChange={handleCountryChange}
                        label="Select your country"
                        titleText="Country Flag"
                      />
                      {countrySelectionErrorMsg && <div>Please select Country</div>}
                      </Field>
                      <S.DisplayHandicapIndex id="display-handicap">
                          <TextInput
                            id={`${idPrefix}_cdhNumber`}
                            {...register('cdhNumber')}
                            control={control}
                            helpText={
                              `All entrants from Scotland, England, Ireland or Wales should input their CDH number here or if you are entering from overseas, 
                              please leave this blank and attach your handicap certificate below.`
                            }
                            labelText="CDH Number"
                            placeholderText="Enter CDH Number"
                            autocomplete='off'
                            onChange={e => {
                              const selectedValue = e.target.value;
                              if (!selectedValue.match(/^[0-9]+$/)) {
                                setCdhErrorMsg('Numeric characters only');
                              }
                              else if(selectedValue.length < 10) {
                                setCdhErrorMsg('CDH number sholud be minimum 10 digit');
                              }
                              else if(selectedValue.length > 20) {
                                setCdhErrorMsg('Entered CDH number is incorrect');
                              }
                              else {
                                setCdhErrorMsg('');
                              }
                            }}
                          />
                           {<S.ErrorTextStyle>{cdhErrorMsg}</S.ErrorTextStyle>}
                      </S.DisplayHandicapIndex>
                    <S.BrowseContainer>
                    <div id='displayBrowse' className='display-browse'>
                      <Field>
                        <FormItem>                        
                          <div className='file-uploader'>
                          <FileUploader 
                            id="myfile"
                            {...register('myfile')}
                            buttonLabel="Browse file"
                            filenameStatus="edit"
                            accept={['.doc', '.pdf']}
                            onChange={handleFileUpload}
                            onDelete={handleFileDelete}
                            name="file"
                            multiple={false}
                          >                          
                          </FileUploader>
                          </div>                          
                          {fileUploadError && <span>Please upload File</span>}
                          <S.FileUploadErrorMsg id='file-error-msg'>
                            {fileSizeLimitError}
                            {fileTypeError}
                          </S.FileUploadErrorMsg>
                          <S.FileUploadSuccessrMsg id='file-success-msg'>
                            {fileUploadSuccessMessage}
                          </S.FileUploadSuccessrMsg>
                          <p className='file-item-label'>Enter the Handicap Document (optional)</p>
                          <p className='file-item-label'>Max file size is 1mb. Only .doc, docx, .pdf files are supported.</p>
                        </FormItem>
                      </Field>
                    </div>  
                  </S.BrowseContainer> 
                   <S.WAGRRankingContainer>            
                      <S.ContainerOne id="container-one">
                        <S.StyledlabelForDob>
                            Handicap Index:
                            <Tooltip className='tootip-info1'>
                              {tournamentInfoObject.handicapadditionaltext}
                            </Tooltip>
                        </S.StyledlabelForDob>
                        <TextInput
                            id={`${idPrefix}_handicap_index`}
                            {...register('handicapIndex')}
                            control={control}
                            errorText={formState.errors.handicapIndex?.message}
                            isRequired={isRequired(true ? schema : undefined, `${idPrefix}_handicap_index`, true)}
                            placeholderText="Enter Handicap Index"
                            autocomplete='off'
                            onChange={e => {
                              const targetedValue = e.target.value;
                              if (!targetedValue) {
                                setHandicapErrorMsg('Please enter handicap index');
                                setValidateHandicap(false);
                              }
                              if (String(targetedValue).split('.')[1]?.length > 1) {
                                setHandicapErrorMsg('Handicap index should be upto 1 decimal place');
                                setValidateHandicap(false);
                              }
                              else if (!targetedValue.match(/^[0-9-.]+$/)) {
                                setValidateHandicap(false);
                                setHandicapErrorMsg('Numeric characters only');
                              }
                              else if(plusHandicapIndexCheckStatus){
                                setHandicapErrorMsg('');
                                setValidateHandicap(true);
                              }
                              else if(Number(targetedValue) < tournamentInfoObject.minimumHandicap || Number(targetedValue) > tournamentInfoObject.maximumHandicap){
                              setHandicapErrorMsg(`Handicap index should be ${tournamentInfoObject.maximumHandicap} or better`);
                              setValidateHandicap(false);
                              }
                              else {
                              setHandicapErrorMsg('');
                              setValidateHandicap(true);
                              }
                            }}
                          />  
                          {<S.ErrorTextStyle>{handicapErrorMsg}</S.ErrorTextStyle>}                          
                      </S.ContainerOne>
                      <S.ContainerTwo id="container-two">
                        <TextInput
                            id={`${idPrefix}_wagrranking`}
                            {...register('wagrranking')}
                            control={control}
                            labelText="WAGR ranking "
                            placeholderText="Enter WAGR ranking "
                            autocomplete='off'
                          /> 
                        </S.ContainerTwo> 
                  </S.WAGRRankingContainer>
                  <Field>
                  <Checkbox
                            id={`${idPrefix}_chk_handicap_index`}
                            {...register('chkHandicapIndex')}
                            control={control}
                            labelText="please tick this box if this is a plus handicap."
                            errorText={formState.errors.chkHandicapIndex?.message}    
                            onChange={(e) => {
                              const handicapIndexInput =  document.getElementById(`${idPrefix}_handicap_index`)! as HTMLInputElement;
                              if(e.target.checked){
                                setPlusHandicapIndexCheckStatus(true);
                                setHandicapErrorMsg('');
                                setValidateHandicap(true);
                              }
                              else {
                                if(handicapIndexInput){
                                  handicapIndexInput.value = '';
                                }
                                setPlusHandicapIndexCheckStatus(false);
                                setValidateHandicap(false);
                              }
                            }}                        
                          />
                  </Field>
                  <Field>
                    <TextInput
                        id={`${idPrefix}_home_golf_club`}
                        {...register('homeOfGolf')}
                        control={control}
                        isRequired={isRequired(true ? schema : undefined, `${idPrefix}_home_golf_club`, true)}
                        errorText={formState.errors.homeOfGolf?.message}
                        labelText="Home Golf Club"
                        placeholderText="Enter Home Golf Club"
                        autocomplete='off'
                        helpText={'If overseas, your Country'}
                      />
                  </Field>      
            </FormBody>  
            <S.DetailsFormFooter>
              <Field>
                  <Checkbox
                      id={`${idPrefix}_termsAndConditions`}
                      {...register('termsAndConditions')}
                      isRequired={isRequired(schema, 'termsAndConditions', true)}
                      control={control}
                      errorText={formState.errors.termsAndConditions}                     
                      labelText={
                        // @ts-ignore
                        <div>
                          I have read and accepted St Andrews{' '}
                          <Link to="/tournament_booking_terms_and_conditions" target={'_blank'}>
                          Terms &amp; Conditions
                          </Link>
                          . I also give permission to use my information and photos for St Andrews Links brand promotions.
                        </div>
                      }
                    />
              </Field>
                <ButtonWrapper variation="space-between">
                  <>
                      <S.StyledButton>
                        <ButtonUI
                          variant="primary"
                          type="submit"
                          icon="ArrowRight16"
                          label="Enter Tournament"
                          disabled={!canSubmit}
                        />
                      </S.StyledButton>
                  </> 
                </ButtonWrapper>
            </S.DetailsFormFooter>
          </S.PlayerDetailsContainer>
        </S.MyDetailsForm>  
          </div>)}  
          <ComposedModal
           size="sm"
           open={open}
           onClose={handleModalCancel}
          >
          <ModalHeader 
            title="Enter Tournament"
          />
            <ModalBody>
              <p className="bx--modal-content__text">
                Only Registered users can Enter the Tournament.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                kind="secondary"
                onClick={handleModalCancel}
              >
                Cancel
              </Button>
              <Button
                kind="primary"
                onClick={handleModalOk}
              >
                Ok
              </Button>
            </ModalFooter>  
        </ComposedModal>
    </div>
    );
};
export default TournamentDetailsPage;
