import { Content } from 'next/font/google'
import React from 'react'
import ContentSignIn from './content'
import { useParams } from 'next/navigation';

export default function signIn({
    params: { lng },
}: {
    params: {
        lng: string;
    };
}) {
    return (
        <>
           
            <ContentSignIn params={lng.toString()}/>
        </>


    )
}
