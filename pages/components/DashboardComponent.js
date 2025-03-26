


const DashboardComponent =() =>{

    return(
        <>
         <section class="content" id="Dashboard">
        
        <div class="message py-3">
            <h4>Good Morning!</h4>
            <h5>Sudarsan.</h5>
        </div>
        <div class="overview d-flex align-items-center justify-content-between">
            <h5>Overview</h5>
            <div class="date-picker-container d-flex align-items-center">
                <input type="text" class="form-control " placeholder="Select Date" />
                <i class="fas fa-calendar-alt calendar-icon"></i>
            </div>
        </div>


        <div class="section1">
            <div class="cards sales">
                <div class="icon">
                    <i class="bi bi-currency-dollar"></i>
                </div>
                <div>Total Sales</div>
            </div>
            <div class="cards orders">
                <div class="icon">
                    <i class="bi bi-box-fill"></i>
                </div>
                <div>Total Orders</div>
            </div>
            <div class="cards customers">
                <div class="icon">
                    <i class="bi bi-people-fill"></i>
                </div>
                <div>Total Customers</div>
            </div>
            <div class="cards menu-items">
                <div class="icon">
                    <i class="bi bi-file-earmark-post"></i>
                </div>
                <div>Total Menu Items</div>
            </div>
        </div>

        <div class="graph d-flex justify-content-between mt-5">
            <div class="sales-summary-container">
                <div class="sales-header">
                    <div class="sales-text">
                        <h5 class="mb-1">Sales Summary</h5>
                    </div>

                    <div class="date-picker-container">
                        <input type="text" class="form-control" placeholder="Select Date" />
                        <i class="fas fa-calendar-alt calendar-icon"></i>
                    </div>
                </div>

                <div class="graph-container">
                    <div class="graph-placeholder"></div>
                </div>
            </div>

            <div class="sales-summary-container">
                <div class="sales-header">
                    <div class="sales-text">
                        <h5 class="mb-1">Order Stats</h5>
                    </div>

                    <div class="date-picker-container">
                        <input type="text" class="form-control" placeholder="Select Date" />
                        <i class="fas fa-calendar-alt calendar-icon"></i>
                    </div>
                </div>

                <div class="graph-container">
                    <div class="graph-placeholder"></div>
                </div>
            </div>
        </div>

        <div class="graph d-flex justify-content-between mt-5">
            <div class="sales-summary-container">
                <div class="sales-header">
                    <div class="sales-text">
                        <h5 class="mb-1">Featured Items</h5>
                    </div>
                </div>

                <div class="featured-items ">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png" alt="Espresso" />
                                <p>Espresso</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png" alt="Egg Roll" />
                                <p>Egg Roll</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png" alt="Whopper" />
                                <p>Whopper</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png"
                                 alt="BBQ Pulled Pork" />
                                <p>BBQ Pulled Pork</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png"
                                 alt="Bacon Double Cheeseburger" />
                                <p>Bacon Double Cheeseburger</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png" 
                                alt="Szechuan Shrimp" />
                                <p>Szechuan Shrimp</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png"
                                 alt="Chicken Noodles Soup" />
                                <p>Chicken Noodles Soup</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="item-card">
                                <img src="/assets/images/espresso-thumb.png"
                                 alt="French Fries" />
                                <p>French Fries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sales-summary-container">
                <div class="sales-header">
                    <div class="sales-text">
                        <h5 class="mb-1">Most Popular Items</h5>
                    </div>
                </div>

                <div class="popular-items p-3">
                    <h4>Most Popular Items</h4>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="Baked Potato" />
                                <div class="item-details">
                                    <div class="item-title">Baked Potato</div>
                                    <a href="#" class="item-category">Side Orders</a>
                                    <div class="item-price">$1.50</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="Baked Potato"
                                />
                                <div class="item-details">
                                    <div class="item-title">Baked Potato</div>
                                    <a href="#" class="item-category">Side Orders</a>
                                    <div class="item-price">$1.50</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="Baked Potato"/>
                                <div class="item-details">
                                    <div class="item-title">Baked Potato</div>
                                    <a href="#" class="item-category">Side Orders</a>
                                    <div class="item-price">$1.50</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="French Fries"/>
                                <div class="item-details">
                                    <div class="item-title">French Fries</div>
                                    <a href="#" class="item-category">Side Orders</a>
                                    <div class="item-price">$1.00</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="Homemade Mashed Potato" />
                                <div class="item-details">
                                    <div class="item-title">Homemade Mashed Potato</div>
                                    <a href="#" class="item-category">Side Orders</a>
                                    <div class="item-price">$1.50</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="item-card">
                                <img src="/assets/images/mojito-thumb.png" alt="Cappuccino" />
                                <div class="item-details">
                                    <div class="item-title">Cappuccino</div>
                                    <a href="#" class="item-category">Beverages</a>
                                    <div class="item-price">$1.50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )

}
export default DashboardComponent