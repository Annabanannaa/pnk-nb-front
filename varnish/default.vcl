vcl 4.0;

import std;

backend default {
    .host = "nginx:8080";
}

backend imgproxy {
    .host = "imgproxy:8080";
    .between_bytes_timeout = 6000s;
    .connect_timeout = 6000s;
    .first_byte_timeout = 6000s;
}

sub vcl_recv {

    if (req.url ~ "^/api/auth/providers" || req.url ~ "^/api/auth/session" || req.url ~ "^/api/auth/csrf" || req.url ~ "^/api/auth/callback/credentials" || req.url ~ "^/api/auth/signin" || req.url ~ "^/api/auth/signout" || req.url ~ "^/api/auth/error") {
        set req.backend_hint = default;
        return (pass);
    }

    if (req.url ~ "^/_image/") {
        set req.backend_hint = imgproxy;
        set req.url = regsub(req.url, "^/_image", "");
        return (hash);
    }

    if (req.http.upgrade ~ "(?i)websocket") {
        return (pipe);
    }

    return (pass);
}

sub vcl_pipe {
    if (req.http.upgrade) {
        set bereq.http.upgrade = req.http.upgrade;
        set bereq.http.connection = req.http.connection;
    }
}


sub vcl_backend_response {
    if (beresp.http.content-type ~ "text/*" || beresp.http.content-type ~ "application/javascript") {
        set beresp.do_gzip = true;
    }

    set beresp.http.X-Url = bereq.url;
    set beresp.http.X-Host = bereq.http.host;
}

sub vcl_deliver {
    unset resp.http.X-Url;
    unset resp.http.X-Host;

    # Unset the tagged cache headers
    unset resp.http.X-Cache-Tags;

    unset resp.http.Server;
    unset resp.http.Via;
    unset resp.http.X-Varnish;

    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
}
