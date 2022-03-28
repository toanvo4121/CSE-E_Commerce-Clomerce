import React from 'react'

import Accordian from '../Accordian/Accordian'
import PageInfo from '../PageInfo/PageInfo'
import Footer from '../Footer'
import faq from './faqList'


function FAQ() {
    const display = faq.map((faqData, index) => <Accordian title={faqData.question} key={index}>
        {faqData.answer}
    </Accordian>)

    return (
        <>
            <PageInfo>
                <p className="page-info">FAQ</p>
            </PageInfo>
            <div className="container my-5 py-4">
                {display}
            </div>
            <Footer />
        </>
    )
}

export default FAQ