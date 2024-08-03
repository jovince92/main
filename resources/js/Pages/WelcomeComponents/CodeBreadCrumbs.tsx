import { Fragment } from 'react'
import { BreadCrumb } from '../Welcome'
import { Code } from '@/types';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type Props = {
    breadcrumb:BreadCrumb[];    
    selectedCode: Code;
}

const CodeBreadCrumbs = (props: Props) => {
    const {breadcrumb,selectedCode} = props;
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumb.map((crumb, index) => (
                    <Fragment key={crumb.id}>
                        <BreadcrumbItem >
                            <BreadcrumbLink asChild className={cn(crumb.id===selectedCode.id?'text-primary font-semibold':'text-muted-foreground')}>
                                <Link href={route('welcome',{id:crumb.id})}>
                                    {crumb.name}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CodeBreadCrumbs