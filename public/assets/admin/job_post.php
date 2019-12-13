<?php include 'header.php'; ?>

<!-- Breadcrumb-->
<div class="breadcrumb-holder">
        <div class="container-fluid">
          <ul class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Job Post</li>
          </ul>
        </div>
      </div>
      <section class="forms">
        <div class="container-fluid">
          <!-- Page Header-->
          <header> 
            <h1 class="h3 display">Job Post</h1>
          </header>
          <div class="row">
            
            <div class="col-lg-12">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                  <h4>Job post of jobseeker</h4>
                </div>
                <div class="card-body">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-sm-2">Title</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="email" placeholder="Title" class="form-control form-control-success">
                                <!-- <small class="form-text">Example help text that remains unchanged.</small> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlTextarea1">About</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlTextarea1">Responsibilities</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        <textarea id="demo">
                            <br/>
                            <p style="text-align: center;"><img src="https://mdbootstrap.com/wp-content/uploads/2018/06/logo-mdb-jquery-small.png" class="img-fluid"></p>
                            <h1 style="text-align: center;">MDBootstrap</h1>
                            <p style="text-align: center;">WYSIWYG Editor</p>
                            <p style="text-align: center;"><a href="https://mdbootstrap.com" target="_blank" contenteditable="false" style="font-size: 1rem; text-align: left;">MDBootstrap.com</a>&nbsp;© 2018</p>
                            <p style="text-align: left;"><b>Features:</b></p>
                            <p style="text-align: left;">
                                <ul>
                                    <li>Changing block type</li>
                                    <li>Text formatting (bold, italic, strikethrough, underline)</li>
                                    <li>Setting text color</li>
                                    <li>Text aligning</li>
                                    <li>Inserting links</li>
                                    <li>Inserting pictures</li>
                                    <li>Creating a list (bulled or numbered)</li>
                                </ul>
                                <p><b>Options:</b></p>
                                <ul>
                                    <li>Translations</li>
                                    <li>Using your own color palette</li>
                                    <li>Disabling/enabling tooltips</li>
                                </ul>
                            </p>
                        </textarea>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Category</label>
                            <div class="col-sm-10">
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>--Select Category--</option>
                                <option>Software</option>
                                <option>VLSI</option>
                                <option>Admin</option>
                            </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Job Level</label>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                    <label class="form-check-label" for="inlineRadio1">Entry-level</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                    <label class="form-check-label" for="inlineRadio2">Medium-level</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                                    <label class="form-check-label" for="inlineRadio3">Senior-level</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Sub Category</label>
                            <div class="col-sm-10">
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>--Select Category--</option>
                                <option>Software</option>
                                <option>VLSI</option>
                                <option>Admin</option>
                            </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Select Companies</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option value="">--Select companies--</option> 
                                    <option value="2"> Rogahn and Sons</option>
                                    <option value="4"> Feeney, Parker and Mohr</option>
                                    <option value="5"> Muller PLC</option>
                                    <option value="6"> Wisoky LLC</option>
                                    <option value="7"> Jenkins PLC</option>
                                    <option value="8"> Parisian Ltd</option>
                                    <option value="9"> Oberbrunner-Conroy</option> 
                                    <option value="10"> Wintheiser, Grady and Nolan</option> 
                                    <option value="11"> Orn, Vandervort and Koch</option> 
                                    <option value="12"> Ankunding-Lueilwitz</option> 
                                    <option value="13"> Quigley-Greenholt</option>
                                    <option value="14"> Turcotte-Maggio</option> 
                                    <option value="15"> Lind, Klocko and Weimann</option>
                                    <option value="16"> Armstrong Ltd</option> 
                                    <option value="17"> Gottlieb, Fadel and Terry</option>
                                    <option value="18"> Keebler-Goodwin</option> 
                                    <option value="19"> Larson Group</option>
                                    <option value="20"> Veum, Bednar and Hirthe</option>
                                    <option value="21"> Jaskolski-O'Hara</option> 
                                    <option value="22"> Ritchie and Sons</option> 
                                    <option value="23"> O'Keefe-Gorczany</option>
                                    <option value="24"> Bosco Group</option> 
                                    <option value="25"> Stiedemann, Block and Hirthe</option> 
                                    <option value="26"> Cassin-Schulist</option> 
                                    <option value="27"> Howell, Carroll and Tremblay</option> 
                                    <option value="28"> Mraz PLC</option> 
                                    <option value="29"> Borer, Romaguera and Greenholt</option>
                                    <option value="30"> Nader-Dicki</option>
                                    <option value="31"> Purdy-Wilkinson</option>
                                    <option value="32"> Feest-Monahan</option> 
                                    <option value="33"> Boyle, Hintz and Marvin</option>
                                    <option value="34"> Roberts-Funk</option>
                                    <option value="35"> Price, Heaney and Lynch</option>
                                    <option value="36"> Swift and Sons</option> 
                                    <option value="37"> Okuneva, Kunze and Hickle</option>
                                    <option value="38"> Tillman-Friesen</option> 
                                    <option value="39"> Mraz-Ward</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Education</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Education" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Additional Requirements</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Education" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Nature</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Nature" class="form-control form-control-success">
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-sm-2">Experience</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Experience" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Vacancy</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Vacancy" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Additional Instructions</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Additional Instructions" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Hot Jobs</label>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4">
                                    <label class="form-check-label" for="inlineRadio4">Yes</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5">
                                    <label class="form-check-label" for="inlineRadio5">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Is negotiable?</label>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio6" value="option6">
                                    <label class="form-check-label" for="inlineRadio6">Yes</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio7" value="option7">
                                    <label class="form-check-label" for="inlineRadio7">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="exampleFormControlSelect1">Apply online ?</label>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio8" value="option8">
                                    <label class="form-check-label" for="inlineRadio8">Yes</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio9" value="option9">
                                    <label class="form-check-label" for="inlineRadio9">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Maximum Sallary</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Maximum Sallary" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Minimum Sallary</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Minimum Sallary" class="form-control form-control-success">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Source</label>
                            <div class="col-sm-10">
                                <input id="inputHorizontalSuccess" type="text" placeholder="Source" class="form-control form-control-success">
                            </div>
                        </div>

                        <div class="form-group row">       
                            <div class="col-sm-10 offset-sm-2">
                                <input type="submit" value="Submit" class="btn btn-info">
                            </div>
                        </div>
                    </form>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </section>

<?php include 'footer.php'; ?>