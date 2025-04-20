


const DashboardComponent =() =>{

    return(
        <>
         <section class="content" id="Dashboard">
        
        <div class="message py-3">
            <h4>Good Morning!</h4>
           
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

        <div class="graph  justify-content-between mt-5">
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

       
    </section>
        </>
    )

}
export default DashboardComponent