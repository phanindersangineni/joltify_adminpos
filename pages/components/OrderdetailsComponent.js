

const OrdedetailsComponent =() =>{

    return(<>
    <section class="posorderview">
        <div class="header">
            Dashboard /POS Orders /<span class="text-secondary">View</span>
        </div>

        <div class="dashboard-items">

            <div class="order-header">
                <div class="orderid">
                    <h5 class="fs-4 pb-2 align-items-center"><span class="text-secondary">Order ID:</span> #0603255
                        <span
                            style="margin-left: 20px; font-size: 14px; color: rgb(3, 138, 3); background: rgba(179, 248, 179, 0.425); padding: 3px 10px; border-radius: 20px;">Paid</span>
                        <span
                            style="margin-left: 10px; font-size: 14px; color: rgb(29, 118, 235); background: rgba(179, 215, 248, 0.425); padding: 3px 10px; border-radius: 20px;">Prepared</span>
                    </h5>

                    <div class="order-details">
                        <p class="text-secondary"><i class="bi bi-calendar3 me-3"></i><span>09:41 AM, 09-03-2025</span>
                        </p>
                        <p><span>Payment Type:</span> Cash</p>
                        <p><span>Order Type:</span> Daning Table</p>
                        <p><span>Delivery Time:</span> 09-03-2025 08:30 PM-09:00 PM</p>
                        <p><span>Token No:</span> #0108</p>
                        <p><span>Table Name:</span> Table 1</p>
                    </div>

                </div>
                <div class="buttons d-flex gap-2">

                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                            data-bs-display="static" aria-expanded="false">
                            Paid
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            <li><a class="dropdown-item" href="#">Paid</a></li>
                            <li><a class="dropdown-item" href="#">Unpaid</a></li>
                        </ul>
                    </div>

                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                            data-bs-display="static" aria-expanded="false">
                            Prepared
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            <li><a class="dropdown-item" href="#"> Accept</a></li>
                            <li><a class="dropdown-item" href="#"> Preparing</a></li>
                        </ul>
                    </div>

                    <button class="add-item btn btn-primary" id=""><i class="bi bi-printer"></i> Print Invoice</button>

                </div>
            </div>
        </div>

        <div class="section2">
            <div class="w-50">
                <div class="items-img">
                    <div class="heading">
                        <h5>Delivery Information</h5>
                    </div>

                    <div class="order-items">
                        <div class="left">
                            <span>1</span><img 
                            src="/assets/images/vegan_hum-burger_with_cheese-thumb.png" alt="" />

                        </div>
                        <div class="item-details">
                            <p><strong>Vegan Hum-Burger With Cheese</strong></p>
                            <p>Size: Regular</p>
                            <p><strong>$2.50</strong></p>
                        </div>
                    </div>

                    <div class="order-items">
                        <div class="left">
                            <span>1</span><img 
                            src="/assets/images/vegan_hum-burger_with_cheese-thumb.png" alt="" />

                        </div>
                        <div class="item-details">
                            <p><strong>Vegan Hum-Burger With Cheese</strong></p>
                            <p>Size: Regular</p>
                            <p><strong>$2.50</strong></p>
                        </div>
                    </div>

                    <div class="order-items">
                        <div class="left">
                            <span>1</span>
                            <img src="/assets/images/vegan_hum-burger_with_cheese-thumb.png" alt="" />

                        </div>
                        <div class="item-details">
                            <p><strong>Vegan Hum-Burger With Cheese</strong></p>
                            <p>Size: Regular</p>
                            <p><strong>$2.50</strong></p>
                        </div>
                    </div>

                    <div class="order-items">
                        <div class="left">
                            <span>1</span><img 
                            src="/assets/images/vegan_hum-burger_with_cheese-thumb.png" alt="" />

                        </div>
                        <div class="item-details">
                            <p><strong>Vegan Hum-Burger With Cheese</strong></p>
                            <p>Size: Regular</p>
                            <p><strong>$2.50</strong></p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="w-50">
                <div class="amount-details">
                    <div class="left">
                        <p>Subtotal</p>
                        <p>Discount</p>
                        <p class="mt-4"><strong>Total</strong></p>
                    </div>
                    <div class="right">
                        <p>$8.50</p>
                        <p>$0.00</p>
                        <p class="mt-4"><strong>$8.50</strong></p>
                    </div>
                </div>

                <div class="delivery-information">
                    <div class="heading">
                        <h5>Delivery Information</h5>
                    </div>

                    <div class="profile">
                        <img src="/assets/images/profile.png" alt="" />
                        <h6>Will Smith</h6>
                    </div>
                    <div class="contact-details">
                        <p><i class="bi bi-envelope-at-fill"></i> customer@emaple.com</p>
                        <p><i class="bi bi-telephone"></i> +8801234444455</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>)
}
export default OrdedetailsComponent