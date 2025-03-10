<?php
    include "../Portofolio_V/database.php";
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $send_message = $_POST['message'];

        $sql = "INSERT INTO contact (name, email, message) VALUES ('$name', '$email', '$send_message')";

        if ($db->query(query: $sql)) {
            echo "<script>alert('Message Sent!');
            window.location.href = '#home';</script>";
        } else {
            echo "<script>alert('Message Can't Be Sent!');
            window.location.href = '#contact';</script>";
        }
    }
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Jathniel Urdha - Portofolio Pengenalan</title>

    <!-- Style and link -->
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" href="Logo_Nexav_Icon.png"> <!-- Icon -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
</head>

<body>

    <!-- Navbar -->
    
    <nav>
        <div class="wrapper">
            <div class="logo"><a href='#'>Niel</a></div>
            <div class="menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about-me">About Me</a></li>
                    <li><a href="#education-and-skil">Education & Skill</a></li>
                    <li><a href="#portofolio">Portofolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <div class="social-media1">
                        <a href="https://github.com/Ryuz-V">
                            <i class='bx bxl-tiktok'></i>
                        </a>
                        <a href="https://pin.it/5uVcX6rQR">
                            <i class='bx bxl-instagram' ></i>
                        </a>
                        <a href="https://www.behance.net/ryuzv1">
                            <i class='bx bxl-twitter' ></i>
                        </a>
                        </a>
                </ul>
            </div>
            </div>
        </div>
    </nav>



    <!-- End Navbar -->

    <!-- Section Home -->
    <section id="home">
        <div class="container">
            <div class="row">
                <div class="col-5 offset-1 my-auto">
                    <h2>Hello👋</h2>
                    <h1><span class="multiple-text"></span></h1>
                    <h4>Create Innovative, Functional, and UserFriendly Projects that are useful for everyone.<br>
                        Student at Smk Telkom Purwokerto <Span class="fw-bold color-acsent">X PPLG 1</Span></h4>
                </div>
                
                <button onclick="location.href='#about-me'" class=" btn btn-custom1 ">About Me</button>
                <div class="social-icon">
                <!-- social Icon -->

        <div class="social-media">
            <a href="https://github.com/Ryuz-V">
                <i class='bx bxl-github' ></i>
            </a>
            <a href="https://pin.it/5uVcX6rQR">
                <i class='bx bxl-pinterest' ></i>
            </a>
            <a href="https://www.behance.net/ryuzv1">
                <i class='bx bxl-behance' ></i>
            </a>
            <a href="https://www.linkedin.com/in/jathniel-urda-167a7834a/">
                <i class='bx bxl-linkedin' ></i>
            </a>
            <a href="https://dribbble.com/RyuzzV">
                <i class='bx bxl-dribbble' ></i>
            </a>
        </div>
        
                <!-- End Social icon -->
                <br>
                    <a href="#" class="fw-bold text-decoration-none" cv >Download <span class="color-acsent"> Curriculum Vitae</span></a>
                </div>
            </div>
            <div class="img">
                <img src="IMG-20240915-WA0001.jpg" alt="Myself">
            </div>
        </div>
    </section>
<!-- End Home-->

<!-- Section About -->
<section id="about-me" data-aos="fade-up">
    <div class="container-fluid">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10" data-aos="fade-up">
                    <h1 class="text-center">About Me</h1>
                    <hr class="custom-hr">
                </div>
                
                <div class="col-10">
                    <h3 class="text-center text-color" data-aos="fade-up">
                        <b>"keep dreaming endlessly"</b>
                    </h3>
                    <br>
                    <p class="text-center" data-aos="fade-up">
                        Hey Introducing my name is Jathniel Urdha from X PPLG 1, I come from Central Kalimantan who migrated to Java to seek more knowledge, <br>
                        I have a dream to be able to work abroad and return to my country to bring knowledge that can be shared to advance the country. <br>
                        I have a hobby of making poster designs, websites, GFX, etc. Besides that I like to study the world of AI, IOT, and cybersecurity.
                        
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- End About -->

<!-- Section Education And Skill -->
<section id="education-and-skil" data-aos="fade-up">
    <div class="container-fluid">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">
                    <h1 class="fw-bold text-center">Skill</h1>
                    <hr class="hr-education-and-skil">
                </div>
                
                <div class="col-10 text-center mt-3" data-aos="fade-up">
                    <img src="Adobe Ilustratoe.png" alt="" data-aos="fade-up">
                    <img src="Canva.jpg" alt="" data-aos="fade-up">
                    <img src="Capcut.png" alt="" data-aos="fade-up">
                    <img src="Corel Draw.png" alt="" data-aos="fade-up">
                    <img src="download (1).png" alt="" data-aos="fade-up">
                    <br>
                    <img src="html.png" alt="" data-aos="fade-up">
                    <img src="text.png" alt="" data-aos="fade-up">
                    <img src="figma.png" alt="" data-aos="fade-up">
                    <img src="6424a78756db5fb908dca86c.png" alt="" data-aos="fade-up">
                    <img src="92e94fc1fd923902a7a93c87c071fb3d.png" alt="" data-aos="fade-up">
                </div>
            </div>
        </div>
    </div>
</section>

<section id="card" data-aos="fade-up">
    <div class="Keahlian-main-container">
        <div class="grid-3">
            <!-- Keahlian 1 -->
            <div class="keahlian" data-aos="fade-up">
                <div class="keahlian-icon">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24">
                    
                    <path d="M5 19h14v3h-14v-3zm18-11c-.729 0-1.295.79-.832 1.521-1.229 1.474-3.371 2.971-4.355 2.438-1.201-.65-.277-3.302.451-4.982.958.15 1.736-.591 1.736-1.477 0-.829-.672-1.5-1.5-1.5s-1.5.671-1.5 1.5c0 .452.204.853.52 1.127-.645 1.643-2.325 3.807-3.41 3.591-1.347-.268-1.69-3.448-1.685-5.287.62-.183 1.075-.751 1.075-1.431 0-.829-.672-1.5-1.5-1.5s-1.5.671-1.5 1.5c0 .68.455 1.248 1.075 1.432.006 1.839-.338 5.019-1.685 5.287-1.084.216-2.765-1.949-3.41-3.592.316-.274.52-.675.52-1.127 0-.829-.672-1.5-1.5-1.5s-1.5.671-1.5 1.5c0 .886.778 1.627 1.736 1.476.729 1.681 1.652 4.333.451 4.982-.984.533-3.127-.964-4.355-2.438.463-.73-.103-1.52-.832-1.52-.553 0-1 .448-1 1 0 .704.726 1.221 1.413.905 1.134 1.264 3.335 4.242 3.587 7.095h14c.252-2.853 2.453-5.831 3.587-7.095.687.316 1.413-.201 1.413-.905 0-.552-.447-1-1-1z"/></svg>
                </div>
                <h4>UI/UX Design</h4>
                <p>
                    Turn what you have in mind of a digital product into reality.for
                    any platform you consider.
                </p>
            </div>
            
            <!-- Keahlian 2 -->
            <div class="keahlian" data-aos="fade-up">
                <div class="keahlian-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z"/></svg>
                </div>
                <h4>Website Development</h4>
                <p>
                    Inspire from famous products and transform into high quality app products
                </p>
        </div>
        
        <!-- Keahlian 3 -->
        <div class="keahlian" data-aos="fade-up">
            <div class="keahlian-icon">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24">
                <path d="M11.266 7l12.734-2.625-.008-.042-1.008-4.333-21.169 4.196c-1.054.209-1.815 1.134-1.815 2.207v14.597c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-14h-12.734zm8.844-5.243l2.396 1.604-2.994.595-2.398-1.605 2.996-.594zm-5.898 1.169l2.4 1.606-2.994.595-2.401-1.607 2.995-.594zm-5.904 1.171l2.403 1.608-2.993.595-2.406-1.61 2.996-.593zm-2.555 5.903l2.039-2h3.054l-2.039 2h-3.054zm4.247 10v-7l6 3.414-6 3.586zm4.827-10h-3.054l2.039-2h3.054l-2.039 2zm6.012 0h-3.054l2.039-2h3.054l-2.039 2z"/></svg>
            </div>
            <h4>Video Editor</h4>
            <p>
                Creative video maker ranging from cinematics, short films, product promotions, and games as well as film clip editing.
            </p>
    </div>
</section>

<!-- End sKILL -->

<!-- Education -->

<section id="Text-education">
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="Text-education">
                    <h1 class="fw-bold text-center" data-aos="fade-up">Education</h1>
                    <hr class="Custom-hr2"data-aos="fade-up">
                </div>
            </div>
        </div>
    </div>


<div id="verticle-line" data-aos="fade-up"></div>

<!-- Postcard -->
<div class="cover">
    <div class="box" data-aos="fade-up">
        <img src="" alt="">  <!-- Empty -->
        <h2 class="judul_1">SMK Telkom Purwokerto</h2>
        <h4 class="tanggal_1">2024 - Now</h4>
        <p class="isi_1">Focusing on UI/UX Design, Graphic Design, Video editing, web and software development</p>
    </div>
</div>

<div class="gambar">
    <div class="gambar_1">
        <img src="Telkom_School_Logo-removebg-preview.png" width="50" height="50" alt="">
    </div>
</div>

<div class="cover-2">
    <div class="box" data-aos="fade-up">
        <img src="" alt="">  <!-- Empty -->
        <h2 class="judul_2">SMP Negeri 2 Sampit</h2>
        <h4 class="tanggal_2">2021 - 2024</H4>
        <p class="isi_2">active in computer science and foreign languages which helped me develop my skills</p>
    </div>
</div>

<div class="gambar-1">
    <div class="gambar_2">
        <img src="logo_smpn2.png" width="50" height="50" alt="">
    </div>
</div>

<div class="cover-3">
    <div class="box" data-aos="fade-up">
        <img src="" alt="">  <!-- Empty -->
        <h2 class="judul_3">SD Katolik Yos sodarso</h2>
        <h4 class="tanggal_3">2015 - 2021</H4>
        <p class="isi_3">Started self-development with basic lessons and was very active in spirituality and sports.</p>
    </div>
</div>

<div class="gambar-2">
    <div class="gambar_3">
        <img src="images-removebg-preview.png" width="50" height="50" alt="">
    </div>
</div>
</section>


<!-- End Postcard -->

<!-- End Education -->

<!-- Portofolio -->

<section id="portofolio" data-aos="fade-up">
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <h1 class="text-center fw-bold">Portofolio</h1>
                <hr class="custom-hr3" data-aos="fade-up">
            </div>
        </div>

    <div class="post">
        <div class="wrapper11" data-aos="fade-up">
            <div class="image11">
                <img src="img/0028_7.png">
                <div class="content">
                    <h1>Poster Hari Kemerdekaan</h1>
                    <p>Created on 12 August 2024<br>
                        using the alightmotion edit tool
                        <br>and took inspiration from<br>
                        @CHOCO, Tiktok</p>
                </div>
            </div>
        </div>

        <div class="wrapper12">
            <div class="image12">
                <img src="img/Artboard 1.png" width="70%">
                <div class="content12">
                    <h1>Vector Karakter</h1>
                    <p>Character Vector from a Game <br>
                        Guardian Tales <br> and created using
                        Adobe Illustrator</p>
                </div>

                <div class="wrapper13">
                    <div class="image13">
                        <img src="img/GFX Kobo Kanaeru.jpg" width="75%">
                        <div class="content13">
                            <h1>Desain GFX Kobo Kanaeru</h1>
                            <p>GFX/character design and<br>
                                created using alightmotion</p>
                        </div>
                    </div>
                </div>
    </section>
</section>

<div class="portofolio-card-container">
    <div class="card-portofolio" data-aos="fade-up">
        <img src="Screenshot 2025-03-01 220539.png">
        <div class="portofolio-card-content">
            <h3>Islamic History In Indonesia</h3>
            <p>Project Making a book on history lessons that contains the beginning of the creation of Islam and the entry of Islam into Indonesia.</p>
            <a href="https://read.bookcreator.com/NjOScaaPqOWpkhPFBvJ1fDtElb12/IhGKcOK5RAaO3Z3SM6XATg" class="btn">Click Me</a>
        </div>
    </div>
</div>

<div class="portofolio-card-container1">
    <div class="card-portofolio" >
        <img src="45.png">
        <div class="portofolio-card-content">
            <h3>Veridian</h3>
            <p>project in DPK subject B. make website design in figma, veridian is a shoe website. </p>
            <a href="https://www.figma.com/design/tvjAYtPoBG8XkQfO129lEm/Untitled?m=auto&t=8hOoYxxcky8NFKro-6" class="btn">Click Me</a>
        </div>
    </div>
</div>

<!-- end portofolio-->

<!-- Contact -->
<!-- Pesan dari input akan terkirim ke email -->
<section id="contact" data-aos="fade-up">
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="contact-text">
                    <h1 class="custom-contact">Contact Me</h1>
                    <p class="apacoba">Got a question? Send me a message, and I'll get back to you soon.</p>
                    <hr class="aduhai">
                </div>
            </div>
        </div>
    </div>

    <div class="contact-container" data-aos="fade-up">
        <form action="https://api.web3forms.com/submit" method="POST" class="contact-left">
            <div class="contact-left-title">
                <h2>Get In Touch</h2>
                <hr>
            </div>
            <input type="hidden" name="access_key" value="39c9c8e1-c767-4074-a6ae-1bd1f11d8d12">
            <input type="text" name="name" placeholder="Your Name" class="contact-inputs" required>
            <input type="email" name="email" placeholder="Your Email" class="contact-inputs" required>
            <textarea name="message" placeholder="Your Message" class="contact-inputs" required></textarea>
            <button type="submit" name="submit">Submit <img src="assets/arrow_icon.png"></button>
        </form>
        <div class="contact-right3">
            <img src="right_img.png" alt="">
        </div>
</section>



<!-- End Contact -->

<!-- Footer -->

<hr class="finally">
<footer>
    <p>&copy; 2025 Jathniel Urdha. All rights reserved.</p>
</footer>

<!-- End Footer -->

<script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
<script src="script.js"></script>

<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init();
</script>

</body>
</html>