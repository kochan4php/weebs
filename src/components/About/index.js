import Bounce from "react-reveal/Bounce";

const About = () => (
  <div className="container min-h-screen flex items-center">
    <div className="mx-auto max-w-3xl">
      <div className="mb-16">
        <Bounce top>
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-white selection:bg-fuchsia-500 selection:text-fuchsia-900">
            About Hibike! Euphonium
          </h1>
        </Bounce>
      </div>
      <div className="text-white">
        <Bounce right>
          <p className="text-base md:text-lg 2xl:text-xl font-semibold mb-6 selection:bg-violet-500 selection:text-violet-900 text-justify">
            Hibike! Euphonium (響け! ユーフォニアム Hibike! Yūfoniamu) adalah
            sebuah seri novel Jepang yang ditulis oleh Ayano Takeda. Cerita ini
            mengambil tempat di Uji, Kyoto dan berfokus pada Klub Musik SMA
            Kitauji, yang penampilannya semakin membaik setelah ditunjuknya guru
            penasehat yang baru.
          </p>
        </Bounce>
        <Bounce left>
          <p className="text-base md:text-lg 2xl:text-xl font-semibold mb-6 selection:bg-rose-500 selection:text-rose-900 text-justify">
            Sebuah manga adaptasi yang digambar oleh Hami mendapat serialisasi
            di situs web Kono Manga ga Sugoi! Web. Kyoto Animation memproduksi
            dua musim seri anime televisi adaptasi pada tahun 2015 dan 2016.
            Sebuah film layar lebar berjudul Liz and the Blue Bird tayang
            perdana pada April 2018, berfokus pada dua karakter dari Hibike!
            Euphonium. Adaptasi film lainnya berjudul Sound! Euphonium The Movie
            - Our Promise: A Brand New Day tayang perdana pada April 2019 di
            Jepang. Sebuah proyek anime baru telah diumumkan yang berfokus pada
            Kumiko yang menginjak kelas tiga SMA.
          </p>
        </Bounce>
      </div>
    </div>
  </div>
);

export default About;
