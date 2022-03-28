import React from 'react'

import PageInfo from '../PageInfo/PageInfo'
import Header from '../Header'
import Footer from '../Footer'
function Privacy() {
    return (
        <>
            <Header />
            <div style={{ marginTop: '76px' }}></div>
            <PageInfo>
                <p className="page-info">PRIVACY POLICY</p>

            </PageInfo>
            <div className="container my-5 py-2">
                <h4>
                    <strong>
                        CloMerce - Chính sách bảo mật
                    </strong>
                    <hr />
                </h4>
                <p>
                    Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu thập và sử dụng thông tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể cung cấp thông qua trang web khi Quý khách đăng ký tài khoản, đăng ký nhận thông tin liên lạc từ chúng tôi, hoặc khi Quý khách mua sản phẩm, dịch vụ, yêu cầu thêm thông tin dịch vụ từ chúng tôi.

                    Chúng tôi sử dụng thông tin cá nhân của Quý khách để liên lạc khi cần thiết liên quan đến việc Quý khách sử dụng website của chúng tôi, để trả lời các câu hỏi hoặc gửi tài liệu và thông tin Quý khách yêu cầu.

                    Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất để bảo vệ thông tin cũng như việc thanh toán của khách hàng.

                    Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default Privacy