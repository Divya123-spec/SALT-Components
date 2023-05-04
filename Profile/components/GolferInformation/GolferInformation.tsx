
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect, useState } from 'react';
import * as S from './GolferInformation.styles';
import { MyProfileHeader } from '../MyProfileHeader/MyProfileHeader';
import { EditGolferDetails } from '../EditGolferDetails/EditGolferDetails';
import GolferInfoContext from '../../context/golferInfoContext';

 const golferStateInfo :any ={
    handicap: '',
    preferredCourse: '',
    leftorRightHanded: '',
    homeGolfClub: ''

 };
export const GolferInformation = ({
    courseDetails,
    loading }) => {

    const golferInfo = useContext(GolferInfoContext);
    const [editGolferInfo, setEditGolferInfo] =useState(false);
    const handleEdit = () => {
        setEditGolferInfo(true);
    };

    const handleEditSubmit = () => {
        setEditGolferInfo(false);
    };

    useEffect(() => {
        console.log('Use Effect called');
    }, [golferInfo]);



    const golferHandicap =() =>{
        if (golferStateInfo.handicap){
          return (golferStateInfo.handicap);
        }else if(golferInfo.handicap){
            return (golferInfo.handicap);

        }else{
               return '---' ;
        }
    };
    const golferCourse =() =>{
        if (golferStateInfo.preferredCourse){
          return (golferStateInfo.preferredCourse);
        }else if(golferInfo.preferredCourse){
            return (golferInfo.preferredCourse);

        }else{
               return '---' ;
        }
    };
    const golferHanded =() =>{
        if (golferStateInfo.leftorRightHanded){
          return (golferStateInfo.leftorRightHanded);
        }else if(golferInfo.leftorRightHanded){
            return (golferInfo.leftorRightHanded);

        }else{
               return '---' ;
        }
    };
    const golferHomeclub =() =>{
        if (golferStateInfo.homeGolfClub){
          return (golferStateInfo.homeGolfClub);
        }else if(golferInfo.homeGolfClub){
            return (golferInfo.homeGolfClub);

        }else{
               return '---' ;
        }
    };
    
    
    return (
        <div>{loading && <S.StyledLoading>Loading...</S.StyledLoading>}
            {!loading && (!editGolferInfo ?
                <div>
                    <MyProfileHeader title="Golfer Info" handleEdit={handleEdit} />
                    <S.GolferContainer >
                        <S.DetailsFieldRow widths={['50%', '50%']}>
                            <div>
                                <S.Styledlabel>Handicap</S.Styledlabel>
                                <S.Styledspan>{golferHandicap()}</S.Styledspan>
                            </div>
                            <div>
                                <S.Styledlabel>Preferred Course</S.Styledlabel>
                                <S.Styledspan>{golferCourse()}</S.Styledspan>
                            </div>
                        </S.DetailsFieldRow>
                        <S.DetailsFieldRow widths={['50%', '50%']}>
                            <div>
                                <S.Styledlabel>Left/Right Handed</S.Styledlabel>
                                <S.Styledspan>{golferHanded()}</S.Styledspan>
                            </div>
                            <div>
                                <S.Styledlabel>Home Golf Club</S.Styledlabel>
                                <S.Styledspan>{golferHomeclub()}</S.Styledspan>
                            </div>
                        </S.DetailsFieldRow>
                    </S.GolferContainer>
                </div>
                :
                <EditGolferDetails golferDetails={golferInfo} courseDetails={courseDetails} handleEditSubmit={handleEditSubmit} golferStateInfo={golferStateInfo}/>
            )}
        </div >
    );

};

