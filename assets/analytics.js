window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', 'G-1PNVL3VXGY');

const googleTag = document.createElement('script');
googleTag.async = true;
googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-1PNVL3VXGY';
document.head.appendChild(googleTag);

!function (t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog && window.posthog.__loaded) || (window.posthog = e, e._i = [], e.init = function (i, s, a) {
        function g(t, e) {
            var o = e.split('.');
            2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
        }
        p || ((p = t.createElement('script')).type = 'text/javascript', p.crossOrigin = 'anonymous', p.async = !0, p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js', p.onerror = function () { p = null; }, (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r));
        var u = e;
        for (void 0 !== a ? u = e[a] = [] : a = 'posthog', u.people = u.people || [], u.toString = function (t) { var e = 'posthog'; return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e; }, u.people.toString = function () { return u.toString(1) + '.people (stub)'; }, o = 'init capture identify register register_once unregister reset getFeatureFlag isFeatureEnabled on opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing'.split(' '), n = 0; n < o.length; n++) g(u, o[n]);
        e._i.push([i, s, a]);
    }, e.__SV = 1);
}(document, window.posthog || []);

window.posthog.init('phc_CRLUpFa5tiQEURL8CV9F3SaUQA2bE2EmhUQud4Ui5nYn', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only'
});
