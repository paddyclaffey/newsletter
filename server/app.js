const express = require('express')
var path = require('path');
var bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");

const app = express()
const port = 8081
var upload = multer({ dest: 'upload/'});

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('file');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.post('/upload', type, function (req,res) {
    console.log(req.file)
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/" + req.file.originalname + ".png");
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
    } else {
        fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
    }

});

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/newsletter.html'));
});

app.get('/image', function(req, res) {
    req.query.name
    res.sendFile(path.join(__dirname + '/uploads/' + req.query.name + '.png'));
});

app.post('/generateNewsletter', type, function (req,res) {
    console.log(req.body)
    let data = req.body
    let html = getStart();
    html += getPart1(data.item1);
    html += getPart2(data.item2);
    html += getPart3(data.item3);
    html += getPart4(data.item4);
    html += getPart5(data.item5);
    html += getEnd(data.item5);
    
    res.send(html);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

getSingle = function (item) {
    let color = item.values['Colour'];
    let header = item.values['Header'];
    let paragraph = item.values['Paragrah'];
    let image = item.file[0]
 return `
    <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_a4cl1a9inyh_32">
    <tbody>
        <tr>
            <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
    <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
        style="width: 100%; max-width: 600px; border-collapse: separate;">
    <tbody>
        <tr>
            <td class="vb-outer" valign="top" align="center" bgcolor="#5091cf" height="10" style="height: 10px; font-size: 1px; line-height: 1px; background-color: #5091cf; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
    </tr>
    </tbody>
    </table>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_2aj5hxlejqp_26">
    <tbody>
        <tr>
            <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
    <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container halfpad" bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; background-color: #fFFFFF; border-collapse: separate;">
    <tbody>
        <tr>
            <td bgcolor="#fFFFFF" align="left" style="height: 25px; padding-top: 20px; padding-bottom: 14px; padding-right: 20px; padding-left: 20px; background-color: #fFFFFF; font-size: 22px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span>1. <strong> ` + header + ` </strong></span> </td>
    </tr>
    </tbody>
    </table>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_h2ocnm0g1d_21">
    <tbody>
        <tr>
            <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
    <div class="oldwebkit" style="max-width: 600px;"> <table class="vb-row fullpad mobile-article-content newsletter-row-fix" width="600" border="0" cellpadding="0" cellspacing="0"
        bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; padding-top: 20px; padding-bottom: 18px; background-color: #fFFFFF; border-collapse: separate;">
    <tbody>
        <tr>
            <td align="center" valign="top" bgcolor="#fFFFFF" style="background-color: #fFFFFF; font-size: 0;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="560"><tr><td align="center" valign="top"><![endif]-->
    <div style="display: inline-block; max-width: 560px; vertical-align: top; width: 100%;" class="mobile-full"> <table class="vb-content" align="center" border="0" cellspacing="0" cellpadding="0" width="560" style="width: 100%; max-width: 560px; border-collapse: separate;">
    <tbody>
    ` + getImage(image) +
    `<tr>
        <td>
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;"><br>
                        ` + paragraph + `<br></p>
    </td>
    </tr>
    </tbody>
    </table>`
}

getImage = function(image) {
    console.log(image)
    return image ? 
        `<tr>
            <td width="100%" valign="top" align="left" class="links-color">
                <img border="0" hspace="0" vspace="0" width="560" height="358" class="mobile-full" alt="" title="" style="vertical-align: top; width: 560px; height: 358px; border: none; display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="http://localhost:8081/image?name=` + image + `"> </td>
        	</tr>` : '' 

}

getDoubleImage = function(image) {
    return image ? `
            <tr>
                <td width="100%" align="left" class="links-color" style="padding-bottom: 12px;"> <img border="0" hspace="0" vspace="0" width="270" height="180" class="mobile-full" alt="" title="" style="vertical-align: top; width: 270px; height: 180px; border: none; display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="http://localhost:8081/image?name=` + image + `"> </td>
        </tr>` : '';
}

getTripleImage = function(image) {
    return image ? `
            <tr>
                <td width="100%" valign="top" align="left" class="links-color" style="padding-bottom: 9px;"> <img border="0" hspace="0" vspace="0" width="180" height="120" class="mobile-full" alt="" title="" style="vertical-align: top; width: 180px; height: 120px; border: none; display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="http://localhost:8081/image?name=` + image + `"> </td>
        </tr>` : '';
}

getDouble = function (item) {
    let color = item.values['Colour'];
    let header = item.values['Header'];
    let subHeader1 = item.values['SubHeader1'];
    let paragraph1 = item.values['Paragrah1'];
    let subHeader2 = item.values['SubHeader2'];
    let paragraph2 = item.values['Paragrah2'];
    let image1 = item.file[0]
    let image2 = item.file[1]

    return `<table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_qra72w64d7g_14">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#F2F2F2" height="20" style="height: 20px; font-size: 1px; line-height: 1px; background-color: #F2F2F2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_g3dms1dxi4h_8">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#3b67bc" height="10" style="height: 10px; font-size: 1px; line-height: 1px; background-color: #3b67bc; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_q4aigfej12_18">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container halfpad" bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; background-color: #fFFFFF; border-collapse: separate;">
        <tbody>
            <tr>
                <td bgcolor="#fFFFFF" align="left" style="height: 25px; padding-top: 20px; padding-bottom: 14px; padding-right: 20px; padding-left: 20px; background-color: #fFFFFF; font-size: 22px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span>4. <strong>` + header + `</strong><br></span> </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_bs1hb596eru_28">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <div class="oldwebkit" style="max-width: 600px;"> <table class="vb-row fullpad mobile-article-content newsletter-row-fix" width="600" border="0" cellpadding="0" cellspacing="0"
            bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; padding-top: 20px; padding-bottom: 18px; background-color: #fFFFFF; border-collapse: separate;">
        <tbody>
            <tr>
                <td align="center" valign="top" bgcolor="#fFFFFF" style="background-color: #fFFFFF; font-size: 0;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="560"><tr><td align="center" valign="top"><![endif]-->
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="560" style="width: 100%; max-width: 560px;">
        <tbody>
            <tr>
                <td align="center" valign="top" width="100%" style="border-collapse: collapse; font-size: 0;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="560"><tr><![endif]-->
        <!--[if (gte mso 9)|(lte ie 8)]><td align="left" valign="top" width="280"><![endif]-->
        <div style="display: inline-block; max-width: 280px; vertical-align: top; width: 100%;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="270" style="width: 100%; max-width: 270px; padding-top: 2px; padding-right: 0; padding-bottom: 2px; padding-left: 0; border-collapse: separate;" align="center">
        <tbody> ` +  getDoubleImage(image1) + `
        <tr>
            <td style="font-size: 18px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span style="color: #3f3f3f;"><strong>` + subHeader1 + `</strong><br></span>
        </td>
        </tr>
        <tr>
            <td align="left" class="long-text links-color" style="padding-top: 8px; padding-bottom: 16px; text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">` + paragraph1 + `</p>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td>                                                <td align="left" valign="top" width="280">                                                <![endif]-->
        <div style="display: inline-block; max-width: 280px; vertical-align: top; width: 100%;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="270" style="width: 100%; max-width: 270px; padding-top: 2px; padding-right: 0; padding-bottom: 2px; padding-left: 0; border-collapse: separate;" align="center">
        <tbody> ` +  getDoubleImage(image2) + `
        <tr>
            <td style="font-size: 18px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span style="color: #3f3f3f;"><strong>` + subHeader2 + `</strong><br></span>
        </td>
        </tr>
        <tr>
            <td align="left" class="long-text links-color" style="padding-top: 8px; padding-bottom: 16px; text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">` + paragraph2 + `</p>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td><![endif]-->
        <!--[if (gte mso 9)|(lte ie 8)]></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        <!-- START SOCIAL REACTION SURVEY -->
        <!-- END SOCIAL REACTION SURVEY -->
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_s2nw5vyqbm_30">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#F2F2F2" height="20" style="height: 20px; font-size: 1px; line-height: 1px; background-color: #F2F2F2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        `;
}

getTriple = function (item) {
    let color = item.values['Colour'];
    let header = item.values['Header'];
    let subHeader1 = item.values['SubHeader1'];
    let paragraph1 = item.values['Paragrah1'];
    let subHeader2 = item.values['SubHeader2'];
    let paragraph2 = item.values['Paragrah2'];
    let subHeader3 = item.values['SubHeader3'];
    let paragraph3 = item.values['Paragrah3'];
    let image1 = item.file[0]
    let image2 = item.file[1]
    let image3 = item.file[2]

    return `<table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_mkhpuckqenr_15">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#F2F2F2" height="20" style="height: 20px; font-size: 1px; line-height: 1px; background-color: #F2F2F2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_euw0j7os92m_10">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#ea712b" height="10" style="height: 10px; font-size: 1px; line-height: 1px; background-color: #ea712b; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_ed4bnwgbxs_17">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container halfpad" bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; background-color: #fFFFFF; border-collapse: separate;">
        <tbody>
            <tr>
                <td bgcolor="#fFFFFF" align="left" style="height: 25px; padding-top: 20px; padding-bottom: 14px; padding-right: 20px; padding-left: 20px; background-color: #fFFFFF; font-size: 22px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span>2. <strong> ` + header + ` </strong></span> </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_yx4ntscn05_24">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <div class="oldwebkit" style="max-width: 600px;"> <table class="vb-row fullpad mobile-article-content newsletter-row-fix" width="600" border="0" cellpadding="0" cellspacing="0"
            bgcolor="#fFFFFF" style="width: 100%; max-width: 600px; padding-top: 20px; padding-bottom: 18px; background-color: #fFFFFF; border-collapse: separate;">
        <tbody>
            <tr>
                <td align="center" valign="top" bgcolor="#fFFFFF" style="background-color: #fFFFFF; font-size: 0;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="560"><tr><td align="center" valign="top"><![endif]-->
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="560" style="width: 100%; max-width: 560px;">
        <tbody>
            <tr>
                <td align="center" valign="top" width="100%" style="border-collapse: collapse; font-size: 0;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="560"><tr><![endif]-->
        <!--[if (gte mso 9)|(lte ie 8)]><td align="left" valign="top" width="186"><![endif]-->
        <div style="display: inline-block; max-width: 186px; vertical-align: top; width: 100%; font-size: 0;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="180" style="width: 100%; max-width: 180px; padding-top: 2px; padding-right: 0; padding-bottom: 2px; padding-left: 0; border-collapse: separate;" align="center">
        <tbody>` + getTripleImage(image1) + `
        <tr>
            <td style="font-size: 18px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left; padding-right: 5px; max-width: 180px;"> <span style="color: #3f3f3f;"><strong>` + subHeader1 + `</strong></span>
        </td>
        </tr>
        <tr>
            <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; padding-top: 8px; padding-right: 10px; padding-bottom: 16px; padding-left: 0px; max-width: 180px;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">` + paragraph1 + `</p>
        </td>
        </tr>
        <tr>
            <td valign="top">
                <table cellpadding="0" border="0" align="left" cellspacing="0" class="mobile-full" style="padding-top: 4px;">
        <tbody>
            <tr>
                <td width="auto" valign="middle" bgcolor="#29abe2" align="center" height="26" style="font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; text-align: center; color: #ffffff; font-weight: normal; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; background-color: #29abe2; border-radius: 1px;"> <a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; text-decoration: none; color: #ffffff; font-weight: normal;" target="_new" href="">Jobs Link</a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td>                                                <td align="left" valign="top" width="186">                                                <![endif]-->
        <div style="display: inline-block; max-width: 186px; vertical-align: top; width: 100%; font-size: 0;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="180" style="width: 100%; max-width: 180px; padding-top: 2px; padding-right: 0; padding-bottom: 2px; padding-left: 0; border-collapse: separate;" align="center">
        <tbody>` + getTripleImage(image2) + `
        <tr>
            <td style="font-size: 18px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left; padding-right: 5px; max-width: 180px;"> <span style="color: #3f3f3f;"><strong>` + subHeader2 + `</strong></span>
        </td>
        </tr>
        <tr>
            <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; padding-top: 8px; padding-right: 10px; padding-bottom: 16px; padding-left: 0px; max-width: 180px;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">` + paragraph2 + `</p>
        </td>
        </tr>
        <tr>
            <td valign="top">
                <table cellpadding="0" border="0" align="left" cellspacing="0" class="mobile-full" style="padding-top: 4px;">
        <tbody>
            <tr>
                <td width="auto" valign="middle" bgcolor="#29abe2" align="center" height="26" style="font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; text-align: center; color: #ffffff; font-weight: normal; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; background-color: #29abe2; border-radius: 1px;"> <a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; text-decoration: none; color: #ffffff; font-weight: normal;" target="_new" href="">Read More</a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td>                                                <td align="left" valign="top" width="186">                                                <![endif]-->
        <div style="display: inline-block; max-width: 186px; vertical-align: top; width: 100%; font-size: 0;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="180" style="width: 100%; max-width: 180px; padding-top: 2px; padding-right: 0; padding-bottom: 2px; padding-left: 0; border-collapse: separate;" align="center">
        <tbody> ` + getTripleImage(image3) + `
        <tr>
            <td style="font-size: 18px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left; max-width: 180px;"> <span style="color: #3f3f3f;"><strong>` + subHeader3 + `</strong></span>
        </td>
        </tr>
        <tr>
            <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; padding-top: 8px; padding-right: 0px; padding-bottom: 16px; padding-left: 0px; max-width: 180px;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">` + paragraph3 + `</p>
        </td>
        </tr>
        <tr>
            <td valign="top">
                <table cellpadding="0" border="0" align="left" cellspacing="0" class="mobile-full" style="padding-top: 4px;">
        <tbody>
            <tr>
                <td width="auto" valign="middle" bgcolor="#29abe2" align="center" height="26" style="font-size: 13px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; text-align: center; color: #ffffff; font-weight: normal; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; background-color: #29abe2; border-radius: 1px;"> <a style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; text-decoration: none; color: #ffffff; font-weight: normal;" target="_new" href="">See All</a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td><![endif]-->
        <!--[if (gte mso 9)|(lte ie 8)]></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        <!-- START SOCIAL REACTION SURVEY -->
        <!-- END SOCIAL REACTION SURVEY -->
        </tbody>
        </table>
        `;
}


getStart = function() {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="initial-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <style>@media screen and (max-device-width:600px), screen and (max-width:600px) {table.vb-container {	width:	95% !important;}table.vb-row {	width:	95% !important;}.mobile-article-content {	padding-right:	20px;	padding-left:	20px;}.mobile-hide {	display:	none !important;}.mobile-textcenter {	text-align:	center !important;}.mobile-full {	float:	none !important;	width:	100% !important;	max-width:	none !important;	padding-right:	0 !important;	padding-left:	0 !important;	padding-bottom:	8px;}.mobile-full   table {	max-width:	none !important;}img.mobile-full {	width:	100% !important;	max-width:	none !important;	height:	auto !important;}.dynamic-button-mobile {	width:	calc(100% / 3) !important;}.binary-yes-no {	display:	block !important;}.pulse-survey-mobile {	margin-top:	0px !important;	margin-right:	auto !important;	margin-bottom:	0 !important;	margin-left:	auto !important;}.nps-survey-mobile {	margin-top:	0px !important;	margin-right:	auto !important;	margin-bottom:	0 !important;	margin-left:	auto !important;	width:	220px !important;	text-align:	center !important;}.reaction-survey-mobile {	margin-top:	20px !important;}.pulse-ranges {	display:	inline-block !important;	margin-top:	0px !important;	margin-right:	0px !important;	margin-bottom:	10px !important;	margin-left:	0px !important;}.pulse-ranges   a   img {	width:	28px !important;	height:	28px !important;	margin-top:	0;	margin-right:	5px;	margin-bottom:	0;	margin-left:	5px;}.pulse-binary {	display:	inline-block !important;	margin-top:	0px !important;	margin-right:	20px !important;	margin-bottom:	0px !important;	margin-left:	20px !important;}.pulse-star {	display:	inline-block !important;	margin-top:	0px !important;	margin-right:	3px !important;	margin-bottom:	0px !important;	margin-left:	3px !important;}.survey-text {	width:	95% !important;	margin-top:	0 !important;	margin-right:	auto !important;	margin-bottom:	0 !important;	margin-left:	auto !important;}}#_h2ocnm0g1d_21   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_h2ocnm0g1d_21   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_h2ocnm0g1d_21   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_yx4ntscn05_24   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_yx4ntscn05_24   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_yx4ntscn05_24   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_uyj6eay2pfj_25   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_uyj6eay2pfj_25   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_uyj6eay2pfj_25   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_bs1hb596eru_28   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_bs1hb596eru_28   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_bs1hb596eru_28   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_rftw90d3hrd_27   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_rftw90d3hrd_27   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_rftw90d3hrd_27   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_zcyod84c1u_35   .links-color   a:link {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_zcyod84c1u_35   .links-color   a:visited {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_zcyod84c1u_35   .links-color   a:hover {	color:	#3f3f3f;	color:	#cccccc;	text-decoration:	underline;}#_v93w0h8y3om_29   .links-color   a:link {	color:	#cccccc !important;	color:	#cccccc !important;	text-decoration:	underline !important;	vertical-align:	top !important;}#_v93w0h8y3om_29   .links-color   a:visited {	color:	#cccccc !important;	color:	#cccccc !important;	text-decoration:	underline !important;	vertical-align:	top !important;}#_v93w0h8y3om_29   .links-color   a:hover {	color:	#cccccc !important;	color:	#cccccc !important;	text-decoration:	underline !important;	vertical-align:	top !important;}</style>
    </head>
    <body bgcolor="#ffffff" text="#919191" alink="#cccccc" vlink="#cccccc" style="background-color: #ffffff; color: #919191; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;">
    <center>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_k7gwlyfox3g_22">
    <tbody>
        <tr>
            <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
    <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container halfpad" bgcolor="F2F2F2" style="width: 100%; max-width: 600px; background-color: F2F2F2; border-collapse: separate;">
    <tbody>
        <tr>
            <td bgcolor="F2F2F2" align="left" style="height: 25px; padding-top: 25px; padding-bottom: 0px; padding-right: 20px; padding-left: 20px; background-color: F2F2F2; font-size: 22px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span><span style="font-size: 32pt;" data-mce-style="font-size: 32pt;">Main <strong>Header</strong></span>
    </span>
    </td>
    </tr>
    </tbody>
    </table>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_qfqto8utyq_11">
    <tbody>
        <tr>
            <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
    <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
    <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container halfpad" bgcolor="#F2F2F2" style="width: 100%; max-width: 600px; background-color: #F2F2F2; border-collapse: separate;">
    <tbody>
        <tr>
            <td bgcolor="#F2F2F2" align="left" style="height: 25px; padding-top: 0px; padding-bottom: 38px; padding-right: 20px; padding-left: 20px; background-color: #F2F2F2; font-size: 22px; line-height: 1.3; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: left;"> <span><strong><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">19 JANUARY 2018</span>
    </strong>
    </span>
    </td>
    </tr>
    </tbody>
    </table>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>`;
}

getColumn = function (item) {

    if (item.values && item.values.SubHeader3) {
        console.log('1header exists')
        return getTriple(item)
    } else if (item.values && item.values.SubHeader2) {
        return getDouble(item)
    } else if (item.values && item.values.Header) {
        return getSingle(item)
    } else return '';
}

getPart1= function (item) {
    console.log('get part 1')
    return getColumn(item) + `<!-- PART 1-->
    </div>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    <!-- START SOCIAL REACTION SURVEY -->
    <!-- END SOCIAL REACTION SURVEY -->
    </tbody>
    </table>`;
}

getPart2 = function (item) {
    return getColumn(item) + `<!-- PART 2-->
        </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        <!-- START SOCIAL REACTION SURVEY -->
        <!-- END SOCIAL REACTION SURVEY -->
        </tbody>
        </table>`
}

getPart3 = function (item) {
    return getColumn(item) + `
        <!-- part 3 --></div>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        <!-- START SOCIAL REACTION SURVEY -->
        <!-- END SOCIAL REACTION SURVEY -->
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_qra72w64d7g_14">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#F2F2F2" height="20" style="height: 20px; font-size: 1px; line-height: 1px; background-color: #F2F2F2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_g3dms1dxi4h_8">`;
}

getPart4 = function (item) {
    return getColumn(item) + `<!-- PART 4-->

    </div>
    <!--[if (gte mso 9)|(lte ie 8)]></td><![endif]-->
    <!--[if (gte mso 9)|(lte ie 8)]></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
    </td>
    </tr>
    <!-- START SOCIAL REACTION SURVEY -->
    <!-- END SOCIAL REACTION SURVEY -->
    </tbody>
    </table>`;
}

getPart5 = function (item) {
    return getColumn(item) + `<!-- PART 5-->
    </div>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        <!-- START SOCIAL REACTION SURVEY -->
        <!-- END SOCIAL REACTION SURVEY -->
        </tbody>
        </table>`
}

getEnd = function () {
    return `
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_3qb3g3ac6ao_13">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#F2F2F2" height="20" style="height: 20px; font-size: 1px; line-height: 1px; background-color: #F2F2F2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_1wofwg2qw9w_12">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#ffffff"
            style="width: 100%; max-width: 600px; border-collapse: separate;">
        <tbody>
            <tr>
                <td class="vb-outer" valign="top" align="center" bgcolor="#5091cf" height="10" style="height: 10px; font-size: 1px; line-height: 1px; background-color: #5091cf; padding-left: 9px; padding-right: 9px; min-width: 0 !important;"> &nbsp; </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_v93w0h8y3om_29">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="middle" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table class="vb-row fullpad newsletter-row-fix" width="600" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#fFFFFF"
            style="width: 100%; max-width: 600px; background-color: #fFFFFF; border-collapse: separate;">
        <tbody>
            <tr>
                <td valign="top" align="center" style="font-size: 0; padding-top: 20px; padding-bottom: 14px;">
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
                <tr>
                    <td align="center" valign="top" width="80%">
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="vb-content mobile-article-content" border="0" cellspacing="0" cellpadding="0" width="100%"
                                            style="width: 100%; padding-bottom: 20px; border-collapse: separate;" align="center">
        <tbody>
            <tr>
                <td align="center" valign="middle" class="links-color socialLinks mobile-textcenter" style="font-size: 6px;"> &nbsp; <a style="display: inline-block; margin-top: 0px; margin-right: 2px; margin-bottom: 0px; margin-left: 2px; color: #cccccc; color: #cccccc; text-decoration: underline; vertical-align: top;" target="_new" href=""> <img src="https://d3u3asuynm7hf0.cloudfront.net/templates/images/social/SlackBtn.png" alt="Slack"
            border="0" class="socialIcon" width="32" height="32" style="width: 32px; border: none; display: inline-block; height: 32px; vertical-align: top; padding-bottom: 0px; border-radius: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"> </a> &nbsp; <a style="display: inline-block; margin-top: 0px; margin-right: 2px; margin-bottom: 0px; margin-left: 2px; color: #cccccc; color: #cccccc; text-decoration: underline; vertical-align: top;" target="_new" href=""> <img src="https://d3u3asuynm7hf0.cloudfront.net/templates/images/social/WorkplaceBtn.png" alt="Workplace"
            border="0" class="socialIcon" width="32" height="32" style="width: 32px; border: none; display: inline-block; height: 32px; vertical-align: top; padding-bottom: 0px; border-radius: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"> </a> &nbsp; <a style="display: inline-block; margin-top: 0px; margin-right: 2px; margin-bottom: 0px; margin-left: 2px; color: #cccccc; color: #cccccc; text-decoration: underline; vertical-align: top;" target="_new" href=""> <img src="https://d3u3asuynm7hf0.cloudfront.net/templates/images/social/SharePointBtn.png" alt="SharePoint"
            border="0" class="socialIcon" width="32" height="32" style="width: 32px; border: none; display: inline-block; height: 32px; vertical-align: top; padding-bottom: 0px; border-radius: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"> </a> &nbsp; <a target="_new" href="" style="display: inline-block; margin-top: 0px; margin-right: 2px; margin-bottom: 0px; margin-left: 2px; color: #cccccc; color: #cccccc; text-decoration: underline; vertical-align: top;"> <img src="https://d3u3asuynm7hf0.cloudfront.net/templates/images/social/TwitterBtn.png" alt="Twitter" border="0" class="socialIcon"
            width="32" height="32" style="width: 32px; border: none; display: inline-block; height: 32px; vertical-align: top; padding-bottom: 0px; border-radius: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"> </a> &nbsp; <a style="display: inline-block; margin-top: 0px; margin-right: 2px; margin-bottom: 0px; margin-left: 2px; color: #cccccc; color: #cccccc; text-decoration: underline; vertical-align: top;" target="_new" href=""> <img src="https://d3u3asuynm7hf0.cloudfront.net/templates/images/social/YammerBtn.png" alt="Yammer"
            border="0" class="socialIcon" width="32" height="32" style="width: 32px; border: none; display: inline-block; height: 32px; vertical-align: top; padding-bottom: 0px; border-radius: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;"> </a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        <tr>
            <td>
                <table class="vb-content" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; border-collapse: separate;" align="left">
        <tbody>
            <tr>
                <td valign="middle" align="left" class="long-text links-color mobile-textcenter" style="font-size: 13px; line-height: 20px; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f; text-align: center;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">2450 5th Ave<br>New York City, New York<br>USA<br></p>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f2f2f2" style="background-color: #f2f2f2; min-width: 0 !important;" id="_zcyod84c1u_35">
        <tbody>
            <tr>
                <td class="vb-outer" align="center" valign="top" bgcolor="#f2f2f2" style="background-color: #f2f2f2; padding-left: 9px; padding-right: 9px; min-width: 0 !important;">
        <!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top"><![endif]-->
        <table width="600" border="0" cellpadding="0" cellspacing="0" class="vb-container fullpad newsletter-container-fix" bgcolor="#F2F2F2"
            style="width: 100%; max-width: 600px; background-color: #F2F2F2; padding-top: 0; padding-right: 20px; padding-bottom: 0; padding-left: 20px; border-collapse: separate;">
        <tbody>
            <tr>
                <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; line-height: 1.3; padding-top: 16px; padding-bottom: 14px; font-family: Arial , Helvetica , sans-serif; color: #3f3f3f;"><p style="Margin-top: 0; Margin-bottom: 0; margin-top: 0px; margin-bottom: 0px; -webkit-margin-before: 0px !important; -webkit-margin-after: 0px !important;" data-mce-style="margin-top: 0; margin-bottom: 0;">
                <span style="color: rgb(128 , 128 , 128); font-size: 8pt;" data-mce-style="color: #808080; font-size: 8pt;">
                    <strong>Disclaimer:</strong> This message contains findelity internal confidential information
                </span>
        </p>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </center>
        </body>

        </html>`
}