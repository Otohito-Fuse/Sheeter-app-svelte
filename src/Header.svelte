<script lang="ts">
    const srcLogo: string = "/images/icon_middle.png";
    const srcGitHub: string = "/images/GitHub-Mark-120px-plus.png";
    const href: string = "https://github.com/Otohito-Fuse/Sheeter-app-svelte";
</script>

<header>
    <div class="header-left">
        <div class="wrap">
            <img draggable="false" class="img-logo" src={srcLogo} alt="logo">
        </div>
        <div class="wrap">
            <h1>Lead Sheeter (β)</h1>
        </div>
    </div>
    <div class="header-right">
        <div class="wrap">
            <a {href} target="_blank" rel="noopener noreferrer">
                <img draggable="false" class="img-github" src={srcGitHub} alt="GitHub link">
            </a>
        </div>
    </div>
</header>

<style>
    header {
        width: 100%;
        height: 100px;
        margin: 0;
        padding: 5px 0;
        background-color: #f6f6f6;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
        -webkit-align-items: center;      /* Safari etc. */
        -ms-align-items    : center;      /* IE10        */
        align-items        : center;
        justify-content: space-between;
        box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
        position:relative;
    }

    .header-left {
        margin: 10px 0 10px 60px;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
        -webkit-align-items: center;      /* Safari etc. */
        -ms-align-items    : center;      /* IE10        */
        align-items        : center;
    }

    .header-right {
        margin: 10px 60px 10px 0;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
        -webkit-align-items: center;      /* Safari etc. */
        -ms-align-items    : center;      /* IE10        */
        align-items        : center;
    }

    .img-logo {
        width: 64px;
        height: 64px;
        image-rendering: pixelated;
    }

    .img-github {
        width: 30px;
        image-rendering: pixelated;
    }

    .wrap {
        padding: 0 10px;
    }

    h1 {
        /* Svelte sample title color: */
        /* color: #ff3e00; */
		color: #0d6bc4;
		font-size: 3em;
		font-weight: 200;

        user-select: none; /* CSS3 */
        -moz-user-select: none; /* Firefox */
        -webkit-user-select: none; /* Safari、Chromeなど */
        -ms-user-select: none; /* IE10から */
	}

    @media (max-width: 750px) {
        header {
            height: 80px;
        }

        .header-left {
            margin: 8px 0 8px 16px;
        }

        .header-right {
            margin: 8px 16px 8px 0;
        }

        .img-logo {
            width: 48px;
            height: 48px;
            image-rendering: pixelated;
        }

        .img-github {
            width: 20px;
            image-rendering: pixelated;
        }

        .wrap {
            padding: 0 7px;
        }

        h1 {
            font-size: 2em;
        }
    }
</style>