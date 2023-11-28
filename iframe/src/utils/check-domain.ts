export function checkDomain(domainNames: string[]): boolean {
    const host = new URL(document.referrer).host;
    const domains = domainNames.map((domain: string) => new URL(domain).host);

    return domains.includes(host)
}